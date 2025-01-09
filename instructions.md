# 1
当前目录，是一个微信小程序目录，项目基础代码和框架已经写好了。

现在，你帮我添加一个初始页面：

这个页面风格清爽简洁，有点苹果产品风格的美感。

这个初始页面有个登录页面，页面有两个角色选项，一个是学生，一个是管理员。

有两个输入框，一个是用户ID，一个是密码。

后端接口，目前还没有，所以你先写一个假的接口，返回一个json数据，数据格式如下：

```json
{
    "code": 0,
    "message": "登录成功",
    "data": []
}
```

学生角色，登录成功之后，跳转到学生主页，学生主页目前先随便写点东西，作为demo。

管理员角色，登陆成功之后，跳转到管理员主页，管理员主页目前先随便写点东西，作为demo。

# 2

现在来实现管理员页面。

管理员页面第一项是，实现学生信息管理，管理的内容包括：学生姓名，学号，班级，专业，学院，照片，密码。

管理员可对上述内容，增删改查。

查的话，就是根据学号查询就可以了。

后端接口目前还没有。你可以先把前端部分实现。并做几条假数据即可。

# 3

你完成的不错，不过有个地方需要调整。就是添加学生、编辑学生点击之后，跳转的那个页面，输入框都过大了，输入框的宽度都超过了它外部的盒子。这里调整一下，让它更和谐。

# 4 
你完成的不错，现在需要添加新的功能：在管理员页面，也就是学生管理下面，添加一个公告管理。

公告管理：
1、管理员可以发布公告。

2、管理员可以查看公告，并且可以看到学生对于该公告的评价，并且对评价予以回复。

3、管理员可以编辑公告，以及删除公告。

该模块目前还没有后端接口，请先完成前端部分。可以渲染一些假数据，看一下实现效果。

# 5

最一开始的输入框那里，就是登录那里，两个输入框的宽度都超过了外部盒子的宽度。请做一下调整。

# 6

管理员页面的布局有点奇怪：就是管理员三个字太大，盒子又很窄，需要调整一下

# 7

感觉也不是很好看，“欢迎回来，管理员” 文案改成“欢迎，xxx”，xxx就是当前用户的名字。然后，教务处三个字，就不要了。字体保持统一就可以了，不用放大。

# 8

现在请实现管理员登录功能。

接口url：http://localhost:5001/admin/login

请求方式：post

请求体：

```json
{
    "userid": "admin",
    "password": "123456"
}
```

成功响应体如下，其中会有token和session_id，请保存这两个值，后续请求需要用到。并且根据expire_time设置过期时间。

在本项目的页面中，如果超过过期时间，就要重新登录。

```json
{
    "code": 200,
    "data": {
        "areas": [
            {
                "id": 4,
                "latitude": 39.9092,
                "longitude": 116.397,
                "name": "A区域更新"
            },
            {
                "id": 8,
                "latitude": 39.8892,
                "longitude": 116.427,
                "name": "新区域"
            }
        ],
        "contact": "13900139000",
        "create_time": "2025-01-05 21:43:49",
        "expire_time": "2025-01-08 15:42:37",
        "id": 3,
        "session_id": "admin_3_1736235757",
        "token": "1555e427-3759-4a8e-8110-bc2d4a619a56",
        "userid": "admin001",
        "username": "新管理员名称"
    },
    "message": "登录成功"
}
```

失败响应体如下，这只是其中一种情况，只要code不是200，就是失败：

```json
{
    "code": 401,
    "message": "用户名或密码错误"
}
```


# 9

有个地方需要调整一下，就是管理员页面，登录成功之后，左上角有个主页按钮。

点击这个按钮之后，请不要跳转到登录页面，而是跳转到管理员主页。

如果，跳转的时候，发现没有登录或者登录过期，那就跳转到登录页面。

# 10 

有个地方需要调整一下，就是管理员主页，下方有两个导航：一个是管理主页，一个是学生管理。 这两个导航都不需要。

学生管理的入口，依然在管理员页面的学生管理那个按钮那里。


# 11

现在添加一个新模块：在管理员主页，公告管理下面，添加一个管理员信息。

点击之后，跳转到管理员信息页面。

管理员信息页面，会请求接口：

url:http://192.168.3.43:5001/admin/info/admin001

请求方式：get

成功响应体如下：

```json
{
  "code": 200,
  "data": {
    "areas": [
      {
        "create_time": "2025-01-05 21:43:49",
        "description": "更新的描述",
        "id": 4,
        "latitude": 39.9092,
        "longitude": 116.397,
        "name": "A区域更新"
      },
      {
        "create_time": "2025-01-07 11:12:39",
        "description": "新区域的描述",
        "id": 8,
        "latitude": 39.8892,
        "longitude": 116.427,
        "name": "新区域"
      }
    ],
    "contact": "13900139000",
    "create_time": "2025-01-05 21:43:49",
    "id": 3,
    "update_time": "2025-01-07 11:12:39",
    "userid": "admin001",
    "username": "新管理员名称"
  },
  "message": "获取成功"
}
```

请求失败响应体如下，这只是其中一种情况，只要code不是200，就是失败：

```json
{
  "code": 404,
  "message": "管理员不存在"
}
```

请把请求成功后的数据，渲染到管理员信息这个页面上。

# 12

目前管理员信息页面，已经成功渲染。然后，这个页面做一下调整。

以下条目均改成可输入编辑的：

用户名、联系方式、管理区域名称、管理区域描述、经度、维度。

# 13

现在实现管理员信息页面的保存功能。

当点击保存修改之后，会请求接口：

url:http://192.168.3.43:5001/admin/update/admin001

请求方式：put

请求体：

```json
{
    "username": "新管理员名称",
    "password": "123456",
    "contact": "13900139000",
    "areas": [
        {
            "id": 4, 
            "name": "A区域更新",
            "longitude": 116.397428,
            "latitude": 39.90923,
            "description": "更新的描述"
        },
        {
            
            "name": "新区域",
            "longitude": 116.427428,
            "latitude": 39.88923,
            "description": "新区域的描述"
        }
    ]
}
```

成功响应体如下：

```json
{
  "code": 200,
  "data": {
    "areas": [
      {
        "create_time": "2025-01-05 21:43:49",
        "description": "更新的描述",
        "id": 4,
        "latitude": 39.9092,
        "longitude": 116.397,
        "name": "A区域更新"
      },
      {
        "create_time": "2025-01-07 11:12:39",
        "description": "新区域的描述",
        "id": 8,
        "latitude": 39.8892,
        "longitude": 116.427,
        "name": "新区域"
      }
    ],
    "contact": "13900139000",
    "create_time": "2025-01-05 21:43:49",
    "id": 3,
    "update_time": "2025-01-07 11:12:39",
    "userid": "admin001",
    "username": "新管理员名称"
  },
  "message": "更新成功"
}
```

请把请求成功后的数据，渲染到管理员信息这个页面上。

失败响应体如下，这只是其中一种情况，只要code不是200，就是失败：

```json
{
  "code": 404,
  "message": "管理员不存在"
}
```

# 14

请把所有接口请求的url，例如：http://192.168.3.43:5001/admin/update/admin001，做一个统一的配置。

http://192.168.3.43:5001 这一部分，放到一个配置文件中。

然后，具体的路径，可以保持在原来的位置不改变。

这样我比较好修改。当我请求的后台地址，发生变化的时候，我只改动相关的配置文件就可以了。

# 15
现在需要添加新的接口。

当点击学生管理时，会请求：

url: /admin/students

请求方式：get

获取成功后，响应体如下：

{
  "code": 200,
  "data": [
    {
      "avatar_path": "/avatars/zhangsan.jpg",
      "class_name": "计算机2401班",
      "gender": "男",
      "id": 1,
      "major": "计算机科学与技术",
      "name": "张三",
      "student_id": "2024001"
    },
    {
      "avatar_path": null,
      "class_name": "计算机2401班",
      "gender": "女",
      "id": 2,
      "major": "计算机科学与技术",
      "name": "李四",
      "student_id": "2024002"
    },
    {
      "avatar_path": "/static/uploads/avatars/20250107103422_2024003_samples_0.jpg",
      "class_name": "01班",
      "gender": null,
      "id": 3,
      "major": "计算机",
      "name": "王五",
      "student_id": "2024003"
    },
    {
      "avatar_path": "/static/uploads/students/2024004/20250107104039_samples_0.jpg",
      "class_name": "01班",
      "gender": null,
      "id": 4,
      "major": "计算机",
      "name": "王五",
      "student_id": "2024004"
    },
    {
      "avatar_path": "/static/uploads/students/2024005/20250107104103_samples_0.jpg",
      "class_name": "01班",
      "gender": null,
      "id": 5,
      "major": "计算机",
      "name": "王五",
      "student_id": "2024005"
    }
  ],
  "message": "获取成功"
}

获取失败，响应体中的code不是200。

将获取到的数据，渲染在学生管理这个页面中。渲染的信息：学生姓名、学号、班级、专业、学员。

# 16

现在添加一个新的接口：

学生管理页面，最上面有个根据学号模糊搜索的功能。

接口如下：

url: /admin/students

query参数：

student_id: 学号

admin_userid: 管理员id

请求方式：get

成功响应体如下：

{
  "code": 200,
  "data": [
    {
      "avatar_path": "/avatars/zhangsan.jpg",
      "class_name": "计算机2401班",
      "gender": "男",
      "id": 1,
      "major": "计算机科学与技术",
      "name": "张三",
      "student_id": "2024001"
    }
  ],
  "message": "获取成功"
}

失败响应体中的code不是200。

# 17

接下来，请实现添加学生接口，接口的content-type
是form-data，请求体如下：

```
admin_userid:admin001
student_id:2024010
avatar:file://C:\Users\Gao\Desktop\tmp\subject01.glasses.png.png
name:王五
password:123456
class_name:01班
major:计算机
college:环境学院
```
其中,avatar是学生头像是一个file，name是学生姓名，password是学生密码，class_name是学生班级，major是学生专业，college是学生学院，admin_userid是管理员id，student_id是学生学号。

请求成功后，响应体如下：
{
  "code": 200,
  "data": {
    "avatar_path": "/static/uploads/students/2024010/20250108112617_subject01.glasses.png.png",
    "class_name": "01班",
    "college": "环境学院",
    "create_time": "2025-01-08 11:26:17",
    "id": 7,
    "major": "计算机",
    "name": "王五",
    "student_id": "2024010"
  },
  "message": "创建成功"
}

请求失败的话，响应体中的code不是200。

# 18

管理员页面中的学生管理页面，里面有个添加学生按钮，点击之后，会弹出添加学生的页面，这个页面的输入框输入完成，以及头像选择好之后，可以点击添加学生按钮，添加学生。

添加学生接口如下：

url:/admin/student/create

请求方式：post,

接口的content-type是form-data,

请求体如下：

```
admin_userid:admin001
student_id:2024010
avatar:file://C:\Users\Gao\Desktop\tmp\subject01.glasses.png.png
name:王五
password:123456
class_name:01班
major:计算机
college:环境学院
```
其中,avatar是学生头像是一个file，name是学生姓名，password是学生密码，class_name是学生班级，major是学生专业，college是学生学院，admin_userid是管理员id，student_id是学生学号。

请求成功后，响应体如下：
{
  "code": 200,
  "data": {
    "avatar_path": "/static/uploads/students/2024010/20250108112617_subject01.glasses.png.png",
    "class_name": "01班",
    "college": "环境学院",
    "create_time": "2025-01-08 11:26:17",
    "id": 7,
    "major": "计算机",
    "name": "王五",
    "student_id": "2024010"
  },
  "message": "创建成功"
}

请求失败的话，响应体中的code不是200。



# 19

请在管理员-学生管理页面，增加删除接口。

删除的button已经有了，点击之后调用接口：

url:/admin/student/2024001

请求方式：delete

content-type:application/json

请求体：

```json
{
    "admin_userid": "admin001"
}
```

请求成功后，响应体如下：
{
  "code": 200,
  "message": "删除成功"
}

失败响应体中的code不是200。

# 20

现在对管理员-学生管理页面，编辑页面进行实现：

在学生条目那里，点击编辑按钮，会出现该学生的编辑页面。

请先调用接口，获取该学生的信息，把这些信息渲染在，该学生的编辑页面中。

接口如下：

url：/admin/student/2024001

请求方式：get

请求的query参数：

admin_userid: admin001


请求成功后，响应体如下：
{
  "code": 200,
  "data": {
    "avatar_path": "/avatars/zhangsan.jpg",
    "class_name": "计算机2401班",
    "college": "",
    "create_time": "2025-01-07 09:07:35",
    "email": "zhangsan@example.com",
    "gender": "男",
    "id": 1,
    "major": "计算机科学与技术",
    "name": "张三",
    "phone": "13900001111",
    "student_id": "2024001",
    "update_time": "2025-01-07 09:24:45"
  },
  "message": "获取成功"
}

请求失败，响应体中的code不是200。

# 21

学生个人信息的编辑页面，前端部分做一个调整：仅学号不能修改。其它可以有输入框修改。

# 22
现在需要新增一个接口。就是点击编辑，进入学生个人信息编辑页面的时候，调用如下接口，获取该学生的头像，并渲染在编辑页面的指定位置。

接口如下：

url：/student/avatar/32423424

请求方式：get

请求成功后，响应体 code 为 200， 还有一个image数据。

请求失败返回 code 不为 200。

# 23

现在需要添加保存编辑的接口。

当我点击某个学生条目的编辑按钮时，会进入该学生的编辑页面，当我输入完成之后，点击保存修改按钮，则会调用保存接口。

接口，请求示例：

1 url为：/admin/student/2024001

2 设置请求方法为 PUT

3 设置 Content-Type 为 multipart/form-data

4 在表单数据中添加以下字段：

admin_userid: admin001

name: 张三（可选）

password: 123456（可选）

class_name: 计算机2401班（可选）

major: 计算机科学与技术（可选）

college: 信息工程学院（可选）

avatar: 选择图片文件，这个是文件类型（可选）

可选的意思是，如果用户不修改，则不传这个参数。

请求成功后，响应体如下：

{
  "code": 200,
  "data": {
    "avatar_path": "/static/uploads/students/2024001/20250108195934_subject02.png.png",
    "class_name": "计算机2401班",
    "college": "112333",
    "major": "计算机科学与技术",
    "name": "张三",
    "student_id": "2024001",
    "update_time": "2025-01-08 19:59:34"
  },
  "message": "更新成功"
}

请求失败，响应体中的code不是200。


# 24 

管理员-学生管理页面，有学生条目，每个条目都有一个编辑按钮，点击编辑按钮之后，进入编辑页面。

进入编辑页面，然后，点击保存修改按钮，调用保存接口。

保存接口如下：

url：/admin/student/2024001

请求方式：put

请注意：content-type:json

请求体：

admin_userid:admin001
name:张三（可选）
password:123456（可选）
class_name:计算机2401班（可选）
major:计算机科学与技术（可选）
college:112333（可选）

参数只有上面这几个。另外，可选的意思是，如果用户不修改，则不传这个参数。

请求成功后，响应体如下：

{
  "code": 200,
  "data": {
    "avatar_path": "/static/uploads/students/2024001/20250108195934_subject02.png.png",
    "class_name": "计算机2401班",
    "college": "ssaaaaaa",
    "major": "计算机科学与技术",
    "name": "张三",
    "student_id": "2024001",
    "update_time": "2025-01-09 08:56:55"
  },
  "message": "更新成功"
}

请求失败，响应体中的code不是200。

# 25
我现在相对管理员-学生管理，点击编辑之后，编辑页面的头像上传进行一下调整。

接口我这边已经调通了。

url:/student/avatar/upload/2024001

请求方法是：post

content-type:form-data

请求体传参：

avatar:file://C:\Users\Gao\Desktop\tmp\subject02.png.png

这个avatar是文件类型，用户头像。

响应成功：

{
    "code": 200,
    "data": {
        "avatar_path": "/static/uploads/students/2024001/20250109090850_subject01.glasses.png.png",
        "student_id": "2024001"
    },
    "message": "头像上传成功"
}

响应失败的话，code不是200。

但是，前端部分我不知道怎么实现比较好。你有什么建议吗？
