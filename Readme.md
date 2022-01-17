# **Password API**

This is a REST api made with express js to create random passwords. 

Made by:- [Ashish Bhushan](https://github.com/code-withAshish)

## Usage
The API accepts queries as showin in [example](#example) with this base URL
> https://express-pwd-api.herokuapp.com/pwd

| Query          |     Required      |   Type    |    Parameters    |  Description |
| :---           |    :----:         |   :----:  |       :----:     |   ---:       |
| **uppercase**  |     `yes`         |`Boolean`  | `true` or `false`| _include uppercase letters in the password_|
| **numbers**    |     `yes`         |`Boolean`  | `true` or `false`|    _include numbers in the passsword_       |
| **symbol**     |     `yes`         |`Boolean`  | `true` or `false`|_include special symbols in the password_ |              
|  **len**       |        `yes`      | `Integer` | `8<=len<=100`    | _specify the length of required password_|

### Example

If we need a password of `10` digits with `uppercase` , `symbols` and `numbers` included, so  we will make a query like this

> Note: `lowercase` letters are set by default if user gives all the parameters as `false`


```
https://express-pwd-api.herokuapp.com/pwd?uppercase=true&numbers=true&symbol=true&len=10
```
and in response a json object would be returned like this 

```json
{
"Message": "Request Succesfull",
"status": "200",
"result": "K0AP{dw=ma"
}
```
### Using curl

```bash
curl -X GET "https://express-pwd-api.herokuapp.com/pwd?uppercase=true&numbers=true&symbol=true&len=10"

```
Output
```json
{
  "Message": "Request Successfull",
  "status": "200",
  "result": "B8\"/KvX8u+"
}
```
## Errors
if you  are getting something like this 

```json
{
"Message": "Extra queries detected",
"status": "400 Bad Request"
}
```
or
```json
{
   "errors":[
      {
         "msg":"len query required",
         "param":"len",
         "location":"query"
      }
   ]
}
```

chances are you have written some query incorrectly like *number* instead of `numbers` or *tru* instead of `true`,  provided too many queries,provided less queries.
So, please check the Usage section in case of any problems.