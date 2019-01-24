<template>
  <div id="login-form" style="margin:0 auto; width:500px; height:10px;">
    <form class="form-horizontal">
      <div class="form-group" style="margin:40% 50% 20px 30%;">
         <img src="../assets/logo.png">
      </div>
      <div class="form-group">
        <label for="accountId" class="col-sm-2 control-label">账号</label>
        <div class="col-sm-10">
          <input class="form-control" id="accountId" v-model="loginForm.accountId"  v-on:input="cleanMessage" placeholder="ID/邮箱/手机号">
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-sm-2 control-label">密码</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="password" v-model="loginForm.password" v-on:input="cleanMessage" placeholder="请输入登录密码">
        </div>
      </div>
      <div class="form-group">
         <div class="col-sm-offset-5">
           <font size="2" color="red">{{loginForm.message}}</font>
          <!-- <label style="color: red; font.size: 1">{{loginForm.message}}</label> -->
        </div>
        <div class="col-sm-offset-10">
          <button type="submit" class="btn btn-default" v-on:click="login">登录</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        accountId: '',
        password: '',
        message: ''
      },
      rules: {
        accountId: [
          { required: true, message: '请输入ID/邮箱/手机号', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      showLogin: false
    }
  },

  mounted () {},
  computed: {},
  methods: {
    getApiData: function () {
      var url = 'api/getprodlist'
      // 并且响应成功以后会执行then方法中的回调函数
      this.$http
        .get(url)
        .then(function (result) {
          this.loginForm.username = result.data.message[0].name
        })
        .catch(function () {
          alert('出错了')
        })
    },

    async login () {
      var url = this.GLOBAL.BASE_URL + '/login'
      this.$http
        .post(url, this.loginForm)
        .then(function (res) {
          var resData = res.data
          if (resData.code === 200) {
            const token = resData.token
            window.localStorage.setItem('token', token)
            this.$message({
              type: 'success',
              message: resData.message
            })
            // 登录成功，直接跳转到指定页面
            this.$router.push('manage')
          } else if (resData.code === 401) {
            this.loginForm.message = '账号或密码错误'
            // this.$router.push('manage')
          }
        })
        .catch(function (e) {
          this.$message({
            type: 'error',
            message: '登录失败，请联系管理员'
          })
        })
    },
    cleanMessage: function () {
      this.loginForm.message = ''
    }
  }
}
</script>
