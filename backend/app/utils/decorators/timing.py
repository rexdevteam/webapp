'''
This module defines the `get_time` decorator for the Flask application.


The `get_time` decorator is used to calculate the time it takes for a function
to finish executing. The time is then logged to the console.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
import time
from functools import wraps
from time import perf_counter, sleep
from functools import wraps
from typing import Callable, Any

from ..helpers.loggers import console_log



def get_time(func: Callable) -> Callable:
    """
    Decorator to keep track of the time it took to run a function.
    
    Returns:
        function: The decorated function.
    
    Note that timing your code once isn't the most reliable option
    for timing your code. Look into the timeit module for more accurate
    timing.
    """
    @wraps(func)
    def wrapper(*args, **kwargs) -> Any:

        start_time: float = perf_counter()
        result: Any = func(*args, **kwargs)
        end_time: float = perf_counter()

        console_log("INFO", f"'{func.__name__}()' took {end_time - start_time:.3f} seconds to execute")
        return result

    return wrapper