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
			phone = self.request.get('phone')
			email = self.request.get('email')
			message = self.request.get('message')

			if phone == "":
				mail_message = mail.EmailMessage(sender="atterholtfordistrictjudge@gmail.com", subject="%s at <%s> emailed you from atterholtfordistrictjudge.com!" % (name, email))
			else:
				mail_message = mail.EmailMessage(sender="atterholtfordistrictjudge@gmail.com", subject="%s at <%s (%s)> emailed you from atterholtfordistrictjudge.com!" % (name, email, phone))
			
			mail_message.to = "Mark Atterholt<atterholtfordistrictjudge@gmail.com>"
			mail_message.body = message
			mail_message.send()

			self.response.out.write('Success');
			
class DonationPage(Handler):
		def get(self):
				   self.render("donation.html")
		def post(self):
			name = self.request.get('name')
			email = self.request.get('email')
			address = self.request.get('address')
			occupation = self.request.get('occupation')
			
			mail_message = mail.EmailMessage(sender="atterholtfordistrictjudge@gmail.com", subject="New Donation from %s" % name)
			
			mail_message.to = "Mark Atterholt<atterholtfordistrictjudge@gmail.com>"
			mail_message.body =  ('You have received a donation from ' + name + '!\n' 
			+ 'Their information is\n'
			+ 'Name: ' + name + '\n' 
			+ 'Email: ' + email + '\n'
			+ 'Address: ' + address + '\n'
			+ 'Occupation: ' + occupation)
			mail_message.send()
			
			self.response.out.write('Success');
			
app = webapp2.WSGIApplication([('/', MainPage), ('/donation', DonationPage)])