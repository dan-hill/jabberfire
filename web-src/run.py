"""The run module's only purpose is to launch the application server with options."""

__docformat__ = 'reStructuredText'

from gevent import monkey


def run_application():
    """starts the web application server

        This module first fixes several blocking modules to be be non-blocking,
        then imports the required modules from the application. Then the application
        object is created and the server is started.

        **Advantages**:
         - Initiating the application object and keeping it isolated from the submodules
           of the application keeps it from being unnecessarily tinkered with and behavior
           being modified in unexpected ways.

        """
    monkey.patch_all()

    from app import socket
    from app import create_app

    app = create_app(True)

    socket.run(app, host='0.0.0.0', port=5001)

if __name__ == '__main__':
    run_application()