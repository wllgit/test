<?php
// +----------------------------------------------------------------------
// | snake
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2022 http://baiyf.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: NickBai <1902822973@qq.com>
// +----------------------------------------------------------------------
namespace app\admin\controller;

use app\admin\model\Role;
use think\Controller;
use org\Verify;

class Login extends Controller
{
    //登录页面
    public function index()
    {
        return $this->fetch('/login');
    }

    //登录操作
    public function doLogin()
    {
        $username = input("param.username");
        $password = input("param.password");
        $code = input("param.code");

        $result = $this->validate(compact('username', 'password', "code"), 'AdminValidate');
        if(true !== $result){
            return json(['code' => -5, 'data' => '', 'msg' => $result]);
        }

        $verify = new Verify();
        if (!$verify->check($code)) {
            return json(['code' => -4, 'data' => '', 'msg' => '验证码错误']);
        }

        $hasUser = db('user')->where('username', $username)->find();
        if(empty($hasUser)){
            return json(['code' => -1, 'data' => '', 'msg' => '管理员不存在']);
        }

        if(md5($password) != $hasUser['password']){
            return json(['code' => -2, 'data' => '', 'msg' => '密码错误']);
        }

        $rolename = '123';
        session('username',$username);
        session('role',$rolename);

        //更新管理员状态
        $param = [
            'login_ip' => request()->ip(),
            'login_time'=>time(),
        ];

        db('user')->where('id', $hasUser['id'])->update($param);
        return json(['code' => 1, 'data' => url('index/index'), 'msg' => '登录成功']);
    }

    //验证码
    public function checkVerify()
    {
        $verify = new Verify();
        $verify->imageH = 32;
        $verify->imageW = 100;
        $verify->length = 4;
        $verify->useNoise = false;
        $verify->fontSize = 14;
        return $verify->entry();
    }

    //退出操作
    public function loginOut()
    {
        session('username', null);
        session('id', null);
        session('role', null);  //角色名
        session('rule', null);  //角色节点
        session('action', null);  //角色权限

        $this->redirect(url('index'));
    }
}