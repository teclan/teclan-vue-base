<template>
  <div id="login-form" style="margin:0 auto; width:500px; height:10px;">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">账号</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail3" placeholder="ID/邮箱/手机号">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" placeholder="请输入登录密码">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <label>
              <input type="checkbox"> 记住我
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default" v-on:click="login">登录</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  baseUrl: 'http://localhost:80/api/v1/',
  loginForm: {
    username: '',
    password: ''
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}]
      },
      showLogin: false
    }
  },

  mounted () {
  },
  computed: {
  },
  methods: {
    getApiData: function () {
      var url = 'api/getprodlist'
      // 并且响应成功以后会执行then方法中的回调函数
      this.$http.get(url).then(function (result) {
        this.loginForm.username = result.data.message[0].name
      }).catch(function () {
        alert('出错了')
      })
    },

    login: function () {
      var url = this.GLOBAL.BASE_URL + '/login'
      this.$http.post(url, this.loginForm).then(function (res) {
        var resData = res.data
        if (resData.status === 200) {
          alert(resData.message)
        } else {
          alert(resData.message)
        }
      }).catch(function () {
        alert('出错了')
      })
    }
  }
}
</script>
