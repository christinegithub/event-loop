import json
import requests


bundle_type = 'medium'
date = '2019-04-16'
limit = 9999
offset = 0
status = 'ongoing'
event_response = requests.get(f"https://www.blogto.com/api/v2/events/?bundle_type={bundle_type}&date={date}&limit={limit}&offset={offset}&status={status}")

event_body = json.loads(event_response.content)

for event in event_body["results"]:
    print(event["title"])


# https://www.blogto.com/api/v2/events/123707/
