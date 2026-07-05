import urllib.request
import urllib.error

req = urllib.request.Request('http://127.0.0.1:3000/api/users/info', headers={'User-Agent': 'Mozilla/5.0'})
try:
    res = urllib.request.urlopen(req)
    print("STATUS:", res.status)
    print("BODY:", res.read().decode())
except urllib.error.HTTPError as e:
    print("ERROR:", e.code)
    print("BODY:", e.read().decode())
except Exception as e:
    print("EXCEPTION:", e)
