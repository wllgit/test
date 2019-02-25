<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/24
 * Time: 15:58
 */
namespace app\admin\controller;
use think\Controller;
use think\Loader;

class Auth extends Controller
{
    protected $current_action;

    public function _initialize()
    {
        Loader::import("org/Auth", EXTEND_PATH);
        $auth = new \Auth();
        $this->current_action = request()->module() . '/' . request()->controller() . '/' . lcfirst(request()->action());
        $result = $auth->check($this->current_action, session('user_id'));
        if ($result) {
            echo "权限验证成功";
        }
    }
}
