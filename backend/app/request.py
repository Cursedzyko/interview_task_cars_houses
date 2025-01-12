import requests

# url = "http://localhost:8000/signup/"
# user_data = {
#     "username": "user",
#     "password": "user",
#     "roles": ["user"],
#     "permissions": ["view_cars", "write"]
# }

# response = requests.post(url, json=user_data)

# print(response.status_code)
# print(response.json())


# url = "http://localhost:8000/login/"
# login_data = {
#     "username": "user",
#     "password": "user"
# }

# response = requests.post(url, json=login_data)

# print(response.status_code)
# print(response.json())



# url = "http://127.0.0.1:8000/admin-only/"
# headers = {
#     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzM5MTE3NDA1fQ.WeXm25v-kMkHE5-WDjNJV7NIccH38ANj8cHQRk6PzXY"
# }
# response = requests.get(url, headers=headers)

# print(response.status_code)
# print(response.json())

url = "http://127.0.0.1:8000/add_mock_data/"

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzM5MjgzOTY0fQ.XHY5gbOVajZ4lVccrLKnB2jKzRPP8PpPsfw-WJpeOg8"

headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.post(url, headers=headers)

print(response.status_code)
print(response.json())


url = "http://127.0.0.1:8000/cars/"

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzM5MjgzOTY0fQ.XHY5gbOVajZ4lVccrLKnB2jKzRPP8PpPsfw-WJpeOg8"

headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.get(url, headers=headers)

print(response.status_code)
print(response.json())