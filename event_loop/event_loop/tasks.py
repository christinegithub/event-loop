# STILL trying to figure out how to run background tasks
# will use this file to store all the tasks, once the bg job setup is ready

def get_events():
    # get the json with events for a specific date
    bundle_type = 'medium'
    date = '2019-04-20'
    limit = 9999
    offset = 0
    status = 'ongoing'
    event_list_json = requests.get(f"https://www.blogto.com/api/v2/events/?bundle_type={bundle_type}&date={date}&limit={limit}&offset={offset}&status={status}")

    # convert json received into a python dictionary
    event_list = json.loads(event_list_json.content)
    print(event_list)

    #
    for event_summary in event_list["results"]:
        event_full_json = requests.get(f"https://www.blogto.com/api/v2/events/{event_summary['id']}")
        print(event_full_json)
        event_full = json.loads(event_full_json.content)
        print(event_full)
        try:
            obj, created = Event.objects.get_or_create(
            blogto_id = event_full["id"],
            date = date,
            defaults = {
                'title': event_full["title"],
                'description': event_full["description_stripped"],
                'image_url': event_full["image_url"],
                'start_time': event_full["start_date_time"],
                'end_time': event_full["end_date_time"],
                'venue_name': event_full["venue_name"],
            }
            )
        except Event.MultipleObjectsReturned:
            print("Duplicate event Id: " + str(event_full["id"]))
