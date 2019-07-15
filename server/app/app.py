import falcon
from falcon_cors import CORS

from .todo_list import TodoList


cors = CORS(allow_origins_list=['http://localhost:3000'])
api = application = falcon.API(middleware=[cors.middleware])

tl = TodoList()
api.add_route('/api/todo-list', tl)
