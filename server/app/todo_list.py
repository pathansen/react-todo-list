import json
import falcon


class TodoList(object):

    def on_get(self, req, resp):
        data = {
            'data': [
                {
                    'title': 'Item 1',
                    'description': 'Description 1',
                    'creation_time': 'time 1',
                    'completed': False
                },
                {
                    'title': 'Item 2',
                    'description': 'Description 2',
                    'creation_time': 'time 2',
                    'completed': False
                }
            ]
        }

        resp.body = json.dumps(data, ensure_ascii=True)
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):
        pass
