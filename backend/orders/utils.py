from uuid import uuid4


def generate_code():
    return str(uuid4().hex[:8]).upper()
