import random, string, logging, time
from flask import current_app, abort, request, url_for
from slugify import slugify

def url_parts(url):
    """
    Splits a URL into its constituent parts.

    Args:
        url (str): The URL to split.

    Returns:
        list: A list of strings representing the parts of the URL.
    """
    
    theUrlParts =url.split('/')
    
    return theUrlParts

def get_or_404(query):
    """
    Executes a query and returns the result, or aborts with a 404 error if no result is found.

    Args:
        query (sqlalchemy.orm.query.Query): The SQLAlchemy query to execute.

    Returns:
        sqlalchemy.orm.query.Query: The result of the query.

    Raises:
        werkzeug.exceptions.NotFound: If the query returns no result.
    """
    
    result = query.one_or_none()
    if result is None:
        abort(404)
    
    return result

def int_or_none(s):
    """
    Converts a string to an integer, or returns None if the string cannot be converted.

    Args:
        s (str): The string to convert.

    Returns:
        int or None: The converted integer, or None if conversion is not possible.
    """
    
    try:
        return int(s)
    except:
        return None


def generate_random_string(length=8):
    """
    Generates a random string of specified length, consisting of lowercase letters and digits.

    Args:
        length (int): The desired length of the random string.

    Returns:
        str: A random string of the specified length.
    """
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


def generate_random_number(length: int = 6) -> int:
    """Generates a random number of the specified length.

    Args:
        length: The desired length of the random number.

    Returns:
        A string representing the generated random number.
    """

    if length < 1:
        raise ValueError("Length must be greater than 0")

    rand_num = random.randint(10**(length-1), 10**length - 1)
    
    return rand_num


def generate_slug(name: str, model: object, existing_obj=None) -> str:
    """
    Generates a unique slug for a given name based on the type of db model.

    Parameters:
    name (str): The name to generate a slug for.
    model (str): The type of db model to generate a slug for.
    existing_obj (object): (Optional) The existing object to compare against to ensure uniqueness.
    

    Returns:
    str: The unique slug for the given name.

    Usage:
    Call this function passing in the name and db model you want to generate a slug for. 
    Optionally, you can pass in an existing object to compare against to ensure uniqueness.
    """
    base_slug = slugify(name)
    slug = base_slug
    timestamp = str(int(time.time() * 1000))
    counter = 1
    max_attempts = 4  # maximum number of attempts to create a unique slug
    
    # when updating, Check existing obj name is the same
    if existing_obj:
        if existing_obj.name == name:
            return existing_obj.slug

    
    # Check if slug already exists in database
    is_obj = model.query.filter_by(slug=slug).first()
    
    while is_obj:
        if counter > max_attempts:
            raise ValueError(f"Unable to create a unique slug after {max_attempts} attempts.")
        
        suffix = generate_random_string(5)
        slug = f"{base_slug}-{suffix}-{timestamp}" if counter == 2 else f"{base_slug}-{suffix}"

        # Check if the combination of slug and suffix is also taken
        # Use the helper function with the dynamically determined model type
        is_obj = model.query.filter_by(slug=slug).first()
        
        counter += 1

    return slug


def redirect_url(default='admin.index'):
    return request.args.get('next') or request.referrer or \
        url_for(default)