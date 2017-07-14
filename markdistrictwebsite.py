import os
import webapp2
import jinja2
from google.appengine.api import mail
import time

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                               autoescape = True)

class Handler(webapp2.RequestHandler):
        def write(self, *a, **kw):
                self.response.out.write(*a, **kw)

        def render_str(self, template, **params):
                t = jinja_env.get_template(template)
                return t.render(params)

        def render(self, template, **kw):
                self.write(self.render_str(template, **kw))

class MainPage(Handler):
		def get(self):
				   self.render("index.html")
		def post(self):
			name = self.request.get('name')
			email = self.request.get('email')
			message = self.request.get('descr')
			
			print name;
			print email;
			print message;
			
			mail_message = mail.EmailMessage(sender="atterholtfordistrictjudge@gmail.com", subject="%s at <%s> emailed you from atterholtfordistrictjudge.com!" % (name, email))
			mail_message.to = "Mark Atterholt<atterholtfordistrictjudge@gmail.com>"
			mail_message.body = message
			mail_message.send()

app = webapp2.WSGIApplication([('/', MainPage)])