import requests

def urlUp(url):
    try:
        requests.head(url)
    except:
        return False
    return True