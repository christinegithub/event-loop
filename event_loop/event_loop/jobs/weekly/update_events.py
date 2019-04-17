from django_extensions.management.jobs import BaseJob
from event_loop.models import Event
import json
import requests
import os

class Job(BaseJob):
    help = "My sample job."

    def execute(self):
        bundle_type = 'medium'
        date = '2019-04-18'
        limit = 9999
        offset = 0
        status = 'ongoing'
        event_response = requests.get(f"https://www.blogto.com/api/v2/events/?bundle_type={bundle_type}&date={date}&limit={limit}&offset={offset}&status={status}")
        event_body = json.loads(event_response.content)

        for event in event_body["results"]:
            # each_event = requests.get(f"https://www.blogto.com/api/v2/events/{event['id']}")
            try:
                Event.objects.get_or_create(
                    title = event["title"],
                    description = event["description_stripped"],
                    date = date,
                    image_url = event["image_url"] + "?width=600&height=600",
                    start_time = event["start_time"],
                    # venue = event["venue_name"],
                    end_time = event["end_time"],
                    blogto_id = event["id"])
            except Event.MultipleObjectsReturned:
                print("Duplicate event Id: " + str(event["id"]))
            # executing empty sample job
