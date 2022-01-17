# **Password-generator API**

This is a REST api made with express js to return a strong password as per user choice. 

Made by:- [Ashish Bhushan](https://github.com/code-withAshish)

## Usage

This API is hosted on herokuapp and in order to receive input user needs to make a GET request on this url and provide valid query parameters as shown in examples section.

> https://express-pwd-api.herokuapp.com/

| Query          |     Required      |   Type    |    Parameters    |
| :---           |    :----:         |   :----:  |       ---:       |
| **uppercase**  |     `optional`    |`Boolean`  | `true` or `false`|
| **numbers**  |     `optional`    |`Boolean`  | `true` or `false`|            
| **symbol**     |     `optional`    |`Boolean`  | `true` or `false`|                
|  **len**       |        `yes`      | `Integer` | `8<=len<=100`    |

### Example

Suppose we need a password of `10` digits with `uppercase` , `symbols` and `numbers` include ( `lowercase` letters are set by default if user gives all the parameters as `false`), now we will make a query like this

> https://express-pwd-api.herokuapp.com/?uppercase=true&numbers=true&symbol=true&len=10

and in response a json object would be returned like this 

```json
{
"Message": "Request Succesfull",
"status": "200",
"password": "K0AP{dw=ma"
}
```

if you are getting something like this 

```json
{
"Message": "Wrong query",
"status": "400 Bad Request"
}
```

chances are you have written some word incoorectly like *number* instead of `numbers` or *tru* instead of `true`.
So, please check the Usage section in case of any problems.