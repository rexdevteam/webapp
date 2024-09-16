from datetime import datetime, timezone, timedelta

class DateTimeUtils:
    """
    A utility class for handling timezone-aware and naive datetime objects in UTC.

    This class provides methods to get the current UTC time and convert timestamps
    to both timezone-aware and naive datetime objects.

    Methods:
        aware_utcnow() -> datetime:
            Returns the current UTC time as a timezone-aware datetime object.

        aware_utcfromtimestamp(timestamp) -> datetime:
            Converts a timestamp to a timezone-aware UTC datetime object.

        naive_utcnow() -> datetime:
            Returns the current UTC time as a naive datetime object (without timezone information).

        naive_utcfromtimestamp(timestamp) -> datetime:
            Converts a timestamp to a naive UTC datetime object (without timezone information).
    """
    
    @staticmethod
    def aware_utcnow() -> datetime:
        """
        Returns the current UTC time as a timezone-aware datetime object.

        :return: Timezone-aware datetime object representing the current UTC time.
        """
        return datetime.now(timezone.utc)

    @staticmethod
    def aware_utcfromtimestamp(timestamp) -> datetime:
        """
        Converts a timestamp to a timezone-aware UTC datetime object.

        :param timestamp: The timestamp to convert.
        :return: Timezone-aware datetime object representing the given timestamp in UTC.
        """
        return datetime.fromtimestamp(timestamp, timezone.utc)

    @staticmethod
    def naive_utcnow() -> datetime:
        """
        Returns the current UTC time as a naive datetime object (without timezone information).

        :return: Naive datetime object representing the current UTC time.
        """
        return DateTimeUtils.aware_utcnow().replace(tzinfo=None)

    @staticmethod
    def naive_utcfromtimestamp(timestamp) -> datetime:
        """
        Converts a timestamp to a naive UTC datetime object (without timezone information).

        :param timestamp: The timestamp to convert.
        :return: Naive datetime object representing the given timestamp in UTC.
        """
        return DateTimeUtils.aware_utcfromtimestamp(timestamp).replace(tzinfo=None)
    
    @staticmethod
    def format_date_readable(dt: datetime) -> str:
        return dt.strftime("%dth %B")
    
    
    @staticmethod
    def format_datetime(dt: datetime, fmt: str="%dth %B") -> str:
        """
        Formats a datetime object as a string in a specified format.

        :param dt: The datetime object to format.
        :param fmt: The format string (e.g., '%Y-%m-%d %H:%M:%S').
        :return: Formatted datetime string.
        """
        return dt.strftime(fmt)
    
    @staticmethod
    def parse_datetime(dt_str: str, fmt: str) -> datetime:
        """
        Parses a datetime object from a string in a specified format.

        :param dt_str: The datetime string to parse.
        :param fmt: The format string (e.g., '%Y-%m-%d %H:%M:%S').
        :return: Parsed datetime object.
        """
        return datetime.strptime(dt_str, fmt)

    @staticmethod
    def convert_if_not_none(dt):
            return DateTimeUtils.convert_to_gmt_plus_1(dt) if dt is not None else None
    
    @staticmethod
    def convert_to_gmt_plus_1(dt: datetime) -> datetime:
        """
        Converts a timezone-aware UTC datetime object to GMT+1.

        :param dt: The timezone-aware UTC datetime object to convert.
        :return: Timezone-aware datetime object representing the given time in GMT+1.
        """
        
        # Alternatively, using pytz module:
        # return dt.astimezone(pytz.timezone('Etc/GMT-1'))
        
        if dt is None:
            raise ValueError("The datetime object cannot be None.")
        
        return dt + timedelta(hours=1)


def to_gmt1_or_none(dt):
    return DateTimeUtils.convert_to_gmt_plus_1(dt) if dt is not None else None