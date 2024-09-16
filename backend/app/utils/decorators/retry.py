import logging
from functools import wraps
from typing import Callable, Any
from time import sleep
from sqlalchemy.exc import ( DataError, DatabaseError, OperationalError )


def retry(retries: int = 3, delay: float = 1, app=None) -> Callable:
    """
    Attempt to call a function, if it fails, try again with a specified delay.

    :param retries: The max amount of retries you want for the function call
    :param delay: The delay (in seconds) between each function retry
    :return:
    """

    if retries < 1 or delay <= 0:
        raise ValueError("retries can't be less that 1 and delay has to be greater than 0")

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            for i in range(1, retries + 1):  # 1 to retries + 1 since upper bound is exclusive

                try:
                    logging.info(f'Running ({i}): {func.__name__}()')
                    return func(*args, **kwargs)
                except (OperationalError, DataError, DatabaseError) as e:
                    if i == retries:
                        logging.info(f"Error: {repr(e)}. \n '{func.__name__}()' failed after {retries} retries.")
                        break
                    else:
                        logging.info(f'Error: {repr(e)} -> Retrying...')
                        sleep(delay)  # Add a delay before running the next iteration
                
                except Exception as e:
                    # Break out of the loop if the max amount of retries is exceeded
                    if i == retries:
                        logging.info(f"Error: {repr(e)}. \n '{func.__name__}()' failed after {retries} retries.")
                        break
                    else:
                        logging.info(f'Error: {repr(e)} -> Retrying...')
                        sleep(delay)  # Add a delay before running the next iteration
        return wrapper
    return decorator

