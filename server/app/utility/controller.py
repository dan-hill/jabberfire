from flask_jwt import JWTError
from flask_restful import Api


class ErrorFriendlyApi(Api):
    def error_router(self, original_handler, e):
        if type(e) is JWTError:
            return original_handler(e)
        else:
            return super(ErrorFriendlyApi, self).error_router(original_handler, e)

