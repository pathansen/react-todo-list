import os
import json
import falcon


class TodoList(object):

    def on_get(self, req, resp):
        """
        Get data from server to send to client.
        """

        # Open JSON file holding todo list items
        data_file = os.path.join(os.getcwd(), 'data', 'data.json')
        if os.path.isfile(data_file):
            with open(data_file, 'r') as f:
                data = json.load(f)
        else:  # data file doesn't exist
            data = {'data': []}

        resp.body = json.dumps(data, ensure_ascii=True)
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):
        """
        Save data from client to server.
        """

        # Decode response from string to JSON
        data = json.loads(req.stream.read())

        # Open JSON file holding todo list items
        with open(os.path.join(os.getcwd(), 'data/data.json'), 'w') as f:
            json.dump(data, f, indent=2)

        resp.status = falcon.HTTP_201
