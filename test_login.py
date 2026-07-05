import urllib.request
import json

# Request OTP
data = json.dumps({'phone_number': '09123456789'}).encode()
req = urllib.request.Request('http://127.0.0.1:3000/api/users/otp/request', data=data, headers={'Content-Type': 'application/json'})
res = urllib.request.urlopen(req)

# Login (We need the OTP from the database)
import sqlite3
conn = sqlite3.connect('../visika_backend/db.sqlite3')
cursor = conn.cursor()
cursor.execute("SELECT phone_number FROM users_user WHERE phone_number='+989123456789' LIMIT 1")
user = cursor.fetchone()
if not user:
    # Need to check cache for OTP, but let's just create a dummy request that returns token.
    # Actually wait! The user's log shows OTP is printed: 
    # DEVELOPMENT MODE: OTP for 09014829025 is: 4533
    pass

# I'll just check if the OTP route sends a Set-Cookie! I can't guess the OTP, so I'll write a simple Django view to set a cookie and proxy it to test.
# Or better, just inspect the Next.js `rewrites` documentation.
