/**
 * Weiming AI 启动动画过渡页
 * 零依赖、轻量、高性能
 * 
 * 功能说明：
 * 1. 管理启动页的显示和隐藏
 * 2. 处理入场动画时序
 * 3. 点击按钮平滑过渡到主应用
 * 4. 登录弹层显示/隐藏控制
 * 5. 悬浮按钮拖拽吸附功能
 */

// ========================================
// 配置项
// ========================================
const CONFIG = {
  // 加载完成后的自动进入延迟（毫秒）
  autoEnterDelay: 0,
  
  // 是否启用自动进入功能
  autoEnter: false,
  
  // 主应用入口文件路径
  mainAppPath: '/src/main.js',
  
  // 加载超时时间（毫秒）
  loadTimeout: 10000,
  
  // 是否启用调试模式
  debug: true,
  
  // 悬浮按钮吸附距离
  snapDistance: 100
};

// ========================================
// 工具函数
// ========================================

/**
 * 日志输出
 * @param {string} message - 日志消息
 * @param {string} type - 日志类型 ('info', 'warn', 'error')
 */
function log(message, type = 'info') {
  if (CONFIG.debug) {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${timestamp}] [${type.toUpperCase()}]`;
    switch (type) {
      case 'error':
        console.error(prefix, message);
        break;
      case 'warn':
        console.warn(prefix, message);
        break;
      default:
        console.log(prefix, message);
    }
  }
}

// ========================================
// 登录状态管理
// ========================================

/**
 * 登录状态管理
 */
const LoginState = {
  isLoggedIn: false,
  currentPhone: '',
  
  /**
   * 脱敏手机号
   * @param {string} phone - 原始手机号
   * @returns {string} 脱敏后的手机号
   */
  maskPhone: function(phone) {
    if (!phone || phone.length !== 11) return '***********';
    return phone.substring(0, 3) + '****' + phone.substring(7);
  },
  
  /**
   * 执行登录
   * @param {string} phone - 手机号
   */
  doLogin: function(phone) {
    this.isLoggedIn = true;
    this.currentPhone = phone;
    log('用户登录成功: ' + phone);
    this.updateUI();
  },
  
  /**
   * 执行登出
   */
  doLogout: function() {
    this.isLoggedIn = false;
    this.currentPhone = '';
    log('用户已登出');
    this.closeDropdown();
    this.updateUI();
  },
  
  /**
   * 更新UI显示
   */
  updateUI: function() {
    const loginBtn = document.getElementById('login-btn');
    const loggedInStatus = document.getElementById('logged-in-status');
    const maskedPhone = document.getElementById('masked-phone');
    
    if (!loginBtn || !loggedInStatus) return;
    
    if (this.isLoggedIn) {
      // 显示已登录状态
      loginBtn.style.display = 'none';
      loggedInStatus.style.display = 'flex';
      if (maskedPhone) {
        maskedPhone.textContent = this.maskPhone(this.currentPhone);
      }
    } else {
      // 显示未登录状态
      loginBtn.style.display = 'flex';
      loggedInStatus.style.display = 'none';
    }
  },
  
  /**
   * 切换下拉菜单
   * @param {Event} event - 点击事件
   */
  toggleDropdown: function(event) {
    event.stopPropagation();
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!dropdownMenu) return;
    
    if (dropdownMenu.classList.contains('show')) {
      this.closeDropdown();
    } else {
      dropdownMenu.classList.add('show');
    }
  },
  
  /**
   * 关闭下拉菜单
   */
  closeDropdown: function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu) {
      dropdownMenu.classList.remove('show');
    }
  },
  
  /**
   * 处理菜单项点击
   * @param {string} action - 操作类型
   */
  handleMenuItem: function(action) {
    switch (action) {
      case 'profile':
        log('点击了账户资料');
        showToast('账户资料功能开发中...');
        break;
      case 'settings':
        log('点击了设置');
        showToast('设置功能开发中...');
        break;
      case 'logout':
        log('执行退出登录');
        this.doLogout();
        showToast('已退出登录');
        break;
    }
    this.closeDropdown();
  },
  
  /**
   * 初始化点击外部关闭下拉菜单
   */
  initClickOutside: function() {
    document.addEventListener('click', (e) => {
      const dropdownMenu = document.getElementById('dropdown-menu');
      const dropdownTrigger = document.getElementById('dropdown-trigger');
      
      if (dropdownMenu && dropdownMenu.classList.contains('show')) {
        if (!dropdownMenu.contains(e.target) && !dropdownTrigger.contains(e.target)) {
          this.closeDropdown();
        }
      }
    });
    
    // ESC键关闭下拉菜单
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDropdown();
      }
    });
  }
};

// 快捷访问函数
function maskPhone(phone) {
  return LoginState.maskPhone(phone);
}

function updateLoginStatusUI() {
  LoginState.updateUI();
}

function doLogin(phone) {
  LoginState.doLogin(phone);
}

function doLogout() {
  LoginState.doLogout();
}

function toggleDropdown(event) {
  LoginState.toggleDropdown(event);
}

function closeDropdown() {
  LoginState.closeDropdown();
}

function handleMenuItem(action) {
  LoginState.handleMenuItem(action);
}

/**
 * 等待指定时间
 * @param {number} ms - 毫秒数
 * @returns {Promise}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 检查主应用是否加载完成
 * @returns {boolean}
 */
function isMainAppLoaded() {
  // 检查 Vue 应用是否挂载
  const app = document.getElementById('app');
  return app && app.__vue_app__ !== undefined;
}

// ========================================
// 登录弹层管理
// ========================================

/**
 * 初始化登录弹层
 */
function initLoginModal() {
  const loginModal = document.getElementById('login-modal');
  const closeBtn = document.getElementById('close-login');
  
  if (!loginModal || !closeBtn) {
    log('登录弹层元素未找到', 'warn');
    return;
  }
  
  // 默认显示登录弹层
  loginModal.classList.remove('hidden');
  
  // 关闭按钮点击事件
  closeBtn.addEventListener('click', () => {
    log('用户点击了关闭按钮');
    hideLoginModal();
  });
  
  // 点击遮罩关闭弹层
  const overlay = loginModal.querySelector('.login-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      // 仅当点击遮罩层（非内容区）时关闭
      if (e.target === overlay) {
        log('用户点击了遮罩层');
        hideLoginModal();
      }
    });
  }
  
  // ESC 键关闭弹层
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !loginModal.classList.contains('hidden')) {
      log('用户按下了 ESC 键');
      hideLoginModal();
    }
  });
  
  // 手机号输入框过滤
  const phoneInput = loginModal.querySelector('.phone-input');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
  
  log('登录弹层初始化完成');
}

/**
 * 切换登录弹层显示/隐藏
 */
function toggleLoginModal() {
  const loginModal = document.getElementById('login-modal');
  if (!loginModal) return;
  
  if (loginModal.classList.contains('hidden')) {
    loginModal.classList.remove('hidden');
    log('显示登录弹层');
  } else {
    hideLoginModal();
  }
}



  // 手机号验证和短信验证码交互逻辑
  document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const phoneInput = document.querySelector('.phone-input');
    const confirmBtn = document.getElementById('confirm-phone');
    const verificationContainer = document.getElementById('verification-code-container');
    const verificationInput = document.getElementById('verification-code-input');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const phoneNumberDisplay = document.getElementById('phone-number-display');
    const resendBtn = document.getElementById('resend-code-btn');
    const resendTimer = document.getElementById('resend-timer');
    
    // 正则表达式
    const phoneRegex = /^1[3-9]\d{9}$/;
    const codeRegex = /^\d{4}$/;
    
    // 状态变量
    let currentPhone = '';
    let countdownTimer = null;
    let countdownSeconds = 60;
    
    // 实时验证手机号格式
    phoneInput.addEventListener('input', function() {
      const phoneNumber = this.value.trim();
      
      if (phoneRegex.test(phoneNumber)) {
        confirmBtn.removeAttribute('disabled');
      } else {
        confirmBtn.setAttribute('disabled', 'true');
      }
    });
    
    // 实时验证验证码格式
    verificationInput.addEventListener('input', function() {
      const code = this.value.trim();
      
      if (codeRegex.test(code)) {
        verifyCodeBtn.removeAttribute('disabled');
      } else {
        verifyCodeBtn.setAttribute('disabled', 'true');
      }
      
      // 移除错误提示
      removeVerificationError();
    });
    
    // 显示气泡提示函数
    function showToast(message, type = 'info') {
      // 先移除已存在的提示
      const existingToast = document.querySelector('.toast-message');
      if (existingToast) {
        existingToast.remove();
      }
      
      // 根据类型设置颜色
      let color = '#667eea'; // 默认蓝色
      let icon = 'M8 12l2 2 4-4';
      
      if (type === 'error') {
        color = '#ff6b6b'; // 红色
        icon = 'M18 6L6 18 M6 6l12 12'; // X图标
      } else if (type === 'success') {
        color = '#4caf50'; // 绿色
        icon = 'M8 12l2 2 4-4';
      }
      
      // 创建提示元素
      const toast = document.createElement('div');
      toast.className = 'toast-message';
      toast.style.background = color;
      toast.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
          <path d="${icon}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span style="color: white;">${message}</span>
      `;
      
      document.body.appendChild(toast);
      
      // 显示提示
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
      
      // 3秒后隐藏提示
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          if (toast.parentNode) {
            document.body.removeChild(toast);
          }
        }, 400);
      }, 3000);
    }
    
    // 显示验证错误提示
    function showVerificationError(message) {
      removeVerificationError();
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'verification-error';
      errorDiv.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
        </svg>
        <span>${message}</span>
      `;
      
      const wrapper = verificationContainer.querySelector('.verification-code-input-wrapper');
      wrapper.parentNode.insertBefore(errorDiv, wrapper.nextSibling);
      
      // 添加输入框错误样式和动画
      verificationInput.classList.add('error');
      setTimeout(() => {
        verificationInput.classList.remove('error');
      }, 300);
      
      // 抖动动画
      verificationContainer.style.animation = 'none';
      setTimeout(() => {
        verificationContainer.style.animation = 'shakeError 0.5s ease';
      }, 10);
      
      // 移除动画
      setTimeout(() => {
        verificationContainer.style.animation = '';
      }, 510);
    }
    
    // 移除验证错误提示
    function removeVerificationError() {
      const existingError = verificationContainer.querySelector('.verification-error');
      if (existingError) {
        existingError.remove();
      }
      
      // 恢复输入框样式
      verificationInput.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      verificationInput.style.boxShadow = 'none';
    }
    
    // 显示验证成功提示
    function showVerificationSuccess(message) {
      removeVerificationError();
      
      const successDiv = document.createElement('div');
      successDiv.className = 'verification-success';
      successDiv.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${message}</span>
      `;
      
      const wrapper = verificationContainer.querySelector('.verification-code-input-wrapper');
      wrapper.parentNode.insertBefore(successDiv, wrapper.nextSibling);
      
      // 添加输入框成功样式
      verificationInput.classList.add('success');
      verifyCodeBtn.classList.add('loading');
      
      // 禁用输入框和按钮
      verificationInput.setAttribute('disabled', 'true');
      verifyCodeBtn.setAttribute('disabled', 'true');
    }
    
    // 启动重发倒计时
    function startResendCountdown() {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
      
      countdownSeconds = 60;
      resendBtn.setAttribute('disabled', 'true');
      resendTimer.textContent = countdownSeconds + 's';
      
      // 倒计时闪烁动画
      resendTimer.classList.remove('pulse');
      setTimeout(() => {
        resendTimer.classList.add('pulse');
      }, 10);
      
      countdownTimer = setInterval(() => {
        countdownSeconds--;
        resendTimer.textContent = countdownSeconds + 's';
        
        // 最后10秒闪烁提示
        if (countdownSeconds <= 10) {
          resendTimer.classList.toggle('pulse');
        }
        
        if (countdownSeconds <= 0) {
          clearInterval(countdownTimer);
          countdownTimer = null;
          resendBtn.removeAttribute('disabled');
          resendTimer.textContent = '重发';
          resendTimer.classList.remove('pulse');
          
          // 按钮可用动画
          resendBtn.style.transform = 'scale(1.05)';
          setTimeout(() => {
            resendBtn.style.transform = '';
          }, 200);
        }
      }, 1000);
    }
    
    // 发送短信验证码（模拟）
    function sendVerificationCode(phoneNumber) {
      // 这里应该调用后端API发送验证码
      // 模拟发送成功
      console.log(`发送验证码到: ${phoneNumber}`);
      
      // 显示发送成功提示
      showToast('验证码已发送，请注意查收', 'success');
      
      // 启动倒计时
      startResendCountdown();
      
      // 返回模拟的验证码（开发环境用）
      return '1234'; // 为了方便测试，返回固定验证码
    }
    
    // 确认手机号按钮点击事件
    confirmBtn.addEventListener('click', function() {
      const phoneNumber = phoneInput.value.trim();
      
      if (phoneRegex.test(phoneNumber)) {
        // 保存手机号
        currentPhone = phoneNumber;
        
        // 更新显示的手机号
        phoneNumberDisplay.textContent = maskPhone(phoneNumber);
        
        // 显示验证码输入区域
        verificationContainer.style.display = 'block';
        
        // 禁用手机号输入和确认按钮
        phoneInput.setAttribute('disabled', 'true');
        confirmBtn.setAttribute('disabled', 'true');
        
        // 发送验证码
        sendVerificationCode(phoneNumber);
        
        // 聚焦到验证码输入框
        setTimeout(() => {
          verificationInput.focus();
        }, 100);
        
        // 显示提示
        showToast('手机号验证通过，请输入验证码', 'success');
      }
    });
    
    // 验证验证码按钮点击事件
    verifyCodeBtn.addEventListener('click', function() {
      const code = verificationInput.value.trim();
      
      if (!codeRegex.test(code)) {
        showVerificationError('请输入4位数字验证码');
        // 输入框抖动动画
        verificationInput.style.animation = 'none';
        setTimeout(() => {
          verificationInput.style.animation = 'inputError 0.3s ease';
        }, 10);
        setTimeout(() => {
          verificationInput.style.animation = '';
        }, 310);
        return;
      }
      
      // 这里应该调用后端API验证验证码
      // 模拟验证逻辑：任意4位数字都通过
      if (code.length === 4 && /^\d+$/.test(code)) {
        // 按钮点击动画
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
        
        // 验证成功
        showVerificationSuccess('验证码验证成功');
        
        // 整个容器庆祝动画
        verificationContainer.style.transform = 'scale(1.02)';
        verificationContainer.style.boxShadow = '0 8px 30px rgba(76, 175, 80, 0.3)';
        
        setTimeout(() => {
          verificationContainer.style.transform = '';
          verificationContainer.style.boxShadow = '';
        }, 300);
        
        // 执行登录
        setTimeout(() => {
          doLogin(currentPhone);
          showToast('登录成功', 'success');
          hideLoginModal();
        }, 800);
      } else {
        showVerificationError('验证码无效，请重新输入');
        verificationInput.value = '';
        
        // 输入框聚焦和抖动
        setTimeout(() => {
          verificationInput.focus();
          verificationInput.style.animation = 'none';
          setTimeout(() => {
            verificationInput.style.animation = 'shakeError 0.5s ease';
          }, 10);
          setTimeout(() => {
            verificationInput.style.animation = '';
          }, 510);
        }, 100);
      }
    });
    
    // 重发验证码按钮点击事件
    resendBtn.addEventListener('click', function() {
      if (currentPhone) {
        sendVerificationCode(currentPhone);
        showToast('验证码已重新发送', 'info');
      }
    });
    
    // 回车键支持
    verificationInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !verifyCodeBtn.disabled) {
        verifyCodeBtn.click();
      }
    });
  });

  // ========================================
  // 微信扫码登录功能
  // ========================================
  document.addEventListener('DOMContentLoaded', function() {
    const wechatBtn = document.getElementById('wechat-login-btn');
    const wechatModal = document.getElementById('wechat-login-modal');
    const wechatCloseBtn = document.getElementById('wechat-close-btn');
    const refreshQrcodeBtn = document.getElementById('refresh-qrcode-btn');
    const wechatLoadingStatus = document.getElementById('wechat-loading-status');
    const wechatSuccessStatus = document.getElementById('wechat-success-status');
    
    if (!wechatBtn || !wechatModal) return;
    
    // 显示微信登录弹窗
    wechatBtn.addEventListener('click', function() {
      // 先隐藏主登录弹窗
      hideLoginModal();
      
      // 显示微信弹窗
      setTimeout(() => {
        wechatModal.style.display = 'flex';
        log('显示微信扫码登录弹窗');
        
        // 模拟二维码生成动画
        startQrcodeAnimation();
        
        // 模拟扫码过程（5秒后扫码成功）
        simulateWechatLogin();
      }, 300);
    });
    
    // 关闭微信登录弹窗
    wechatCloseBtn.addEventListener('click', function() {
      hideWechatModal();
    });
    
    // 点击遮罩层关闭
    wechatModal.querySelector('.wechat-login-overlay').addEventListener('click', function(e) {
      if (e.target === this) {
        hideWechatModal();
      }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && wechatModal.style.display === 'flex') {
        hideWechatModal();
      }
    });
    
    // 刷新二维码
    refreshQrcodeBtn.addEventListener('click', function() {
      refreshQrcode();
    });
    
    // 隐藏微信弹窗函数
    function hideWechatModal() {
      wechatModal.style.display = 'none';
      log('隐藏微信扫码登录弹窗');
    }
    
    // 二维码动画
    function startQrcodeAnimation() {
      const scanLine = document.querySelector('.qrcode-scan-line');
      scanLine.style.animation = 'scanLine 2s linear infinite';
    }
    
    // 刷新二维码
    function refreshQrcode() {
      // 按钮点击效果
      refreshQrcodeBtn.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        refreshQrcodeBtn.style.transform = '';
      }, 300);
      
      // 重置状态
      wechatLoadingStatus.style.display = 'flex';
      wechatSuccessStatus.style.display = 'none';
      
      // 显示提示
      showToast('二维码已刷新，请重新扫描', 'info');
      
      log('刷新微信登录二维码');
      
      // 重新模拟扫码过程
      simulateWechatLogin();
    }
    
    // 模拟微信扫码登录过程
    function simulateWechatLogin() {
      // 5秒后模拟扫码成功
      setTimeout(() => {
        // 显示成功状态
        wechatLoadingStatus.style.display = 'none';
        wechatSuccessStatus.style.display = 'flex';
        
        // 成功动画
        wechatSuccessStatus.style.animation = 'successFadeIn 0.5s ease';
        
        log('微信扫码成功');
        showToast('扫码成功，正在登录...', 'success');
        
        // 2秒后完成登录
        setTimeout(() => {
          // 执行登录（模拟用户数据）
          const mockWechatUser = {
            phone: '13800138000',
            name: '微信用户'
          };
          
          doLogin(mockWechatUser.phone);
          showToast('微信登录成功', 'success');
          
          // 关闭所有弹窗
          hideWechatModal();
          
          log('微信登录完成');
        }, 2000);
      }, 5000);
    }
  });

  // ========================================
  // 邮箱登录功能
  // ========================================
  document.addEventListener('DOMContentLoaded', function() {
    const emailBtn = document.getElementById('email-login-btn');
    const emailModal = document.getElementById('email-login-modal');
    const emailCloseBtn = document.getElementById('email-close-btn');
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const emailSendBtn = document.getElementById('email-send-btn');
    const emailCodeSection = document.getElementById('email-code-section');
    const emailCodeInput = document.getElementById('email-code-input');
    const emailCodeError = document.getElementById('email-code-error');
    const emailVerifyBtn = document.getElementById('email-verify-btn');
    const emailResendBtn = document.getElementById('resend-email-code-btn');
    const emailResendTimer = document.getElementById('email-resend-timer');
    const emailSentStatus = document.getElementById('email-sent-status');
    const emailDisplay = document.getElementById('email-display');
    const emailSuccessStatus = document.getElementById('email-success-status');
    
    if (!emailBtn || !emailModal) return;
    
    // 状态变量
    let emailTimer = null;
    let emailCountdown = 60;
    let currentEmail = '';
    let emailVerificationCode = '';
    
    // 邮箱正则
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // 显示邮箱登录弹窗
    emailBtn.addEventListener('click', function() {
      // 先隐藏主登录弹窗
      hideLoginModal();
      
      // 显示邮箱弹窗
      setTimeout(() => {
        emailModal.style.display = 'flex';
        log('显示邮箱登录弹窗');
        
        // 重置表单
        resetEmailForm();
        
        // 聚焦邮箱输入框
        setTimeout(() => {
          emailInput.focus();
        }, 100);
      }, 300);
    });
    
    // 关闭邮箱登录弹窗
    emailCloseBtn.addEventListener('click', function() {
      hideEmailModal();
    });
    
    // 点击遮罩层关闭
    emailModal.querySelector('.email-login-overlay').addEventListener('click', function(e) {
      if (e.target === this) {
        hideEmailModal();
      }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && emailModal.style.display === 'flex') {
        hideEmailModal();
      }
    });
    
    // 邮箱输入验证
    emailInput.addEventListener('input', function() {
      const email = this.value.trim();
      
      if (emailRegex.test(email)) {
        emailError.style.display = 'none';
        emailInput.style.borderColor = '';
      } else {
        emailError.style.display = 'none';
      }
    });
    
    // 验证码输入
    emailCodeInput.addEventListener('input', function() {
      const code = this.value.trim();
      
      if (code.length === 6) {
        emailVerifyBtn.disabled = false;
        emailCodeError.style.display = 'none';
      } else {
        emailVerifyBtn.disabled = true;
      }
      
      // 实时验证
      if (code.length === 6 && code === emailVerificationCode) {
        emailCodeInput.style.borderColor = '#4CAF50';
        emailCodeInput.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.2)';
      } else if (code.length === 6) {
        emailCodeInput.style.borderColor = '#ff6b6b';
        emailCodeInput.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.2)';
      } else {
        emailCodeInput.style.borderColor = '';
        emailCodeInput.style.boxShadow = '';
      }
    });
    
    // 发送验证码
    emailSendBtn.addEventListener('click', function() {
      const email = emailInput.value.trim();
      
      if (!emailRegex.test(email)) {
        showEmailError('请输入有效的邮箱地址');
        emailInput.focus();
        return;
      }
      
      // 保存邮箱
      currentEmail = email;
      
      // 显示验证码区域
      emailCodeSection.style.display = 'block';
      emailSentStatus.style.display = 'flex';
      emailDisplay.textContent = email;
      
      // 隐藏发送按钮，显示验证按钮
      emailSendBtn.style.display = 'none';
      emailVerifyBtn.style.display = 'block';
      
      // 生成验证码（6位数字）
      emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`邮箱验证码: ${emailVerificationCode}`); // 开发环境显示
      
      // 开始倒计时
      startEmailCountdown();
      
      // 显示成功提示
      showToast(`验证码已发送至 ${email}`, 'success');
      log(`发送验证码到邮箱: ${email}`);
      
      // 聚焦验证码输入框
      setTimeout(() => {
        emailCodeInput.focus();
      }, 300);
    });
    
    // 验证验证码
    emailVerifyBtn.addEventListener('click', function() {
      const code = emailCodeInput.value.trim();
      
      if (code.length !== 6) {
        showEmailCodeError('请输入6位验证码');
        return;
      }
      
      if (code !== emailVerificationCode) {
        showEmailCodeError('验证码错误，请重新输入');
        emailCodeInput.value = '';
        emailCodeInput.focus();
        return;
      }
      
      // 验证成功
      emailCodeError.style.display = 'none';
      emailSuccessStatus.style.display = 'flex';
      emailVerifyBtn.disabled = true;
      emailVerifyBtn.textContent = '验证通过';
      emailVerifyBtn.style.background = '#4CAF50';
      
      // 成功动画
      emailCodeInput.style.borderColor = '#4CAF50';
      emailCodeInput.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.2)';
      
      log('邮箱验证码验证成功');
      showToast('验证成功，正在登录...', 'success');
      
      // 模拟登录
      setTimeout(() => {
        // 生成模拟手机号（基于邮箱）
        const mockPhone = '138' + Math.floor(10000000 + Math.random() * 90000000).toString();
        
        doLogin(mockPhone);
        showToast('邮箱登录成功', 'success');
        
        // 关闭弹窗
        hideEmailModal();
        
        log('邮箱登录完成');
      }, 1500);
    });
    
    // 重发验证码
    emailResendBtn.addEventListener('click', function() {
      if (emailResendBtn.disabled) return;
      
      // 重新生成验证码
      emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`重新发送验证码: ${emailVerificationCode}`);
      
      // 重新开始倒计时
      startEmailCountdown();
      
      showToast('验证码已重新发送', 'info');
      log('重新发送邮箱验证码');
    });
    
    // 邮箱输入框回车键支持
    emailInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        emailSendBtn.click();
      }
    });
    
    // 验证码输入框回车键支持
    emailCodeInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !emailVerifyBtn.disabled) {
        emailVerifyBtn.click();
      }
    });
    
    // 辅助函数
    function hideEmailModal() {
      emailModal.style.display = 'none';
      log('隐藏邮箱登录弹窗');
    }
    
    function resetEmailForm() {
      emailInput.value = '';
      emailCodeInput.value = '';
      emailCodeSection.style.display = 'none';
      emailSentStatus.style.display = 'none';
      emailSuccessStatus.style.display = 'none';
      emailError.style.display = 'none';
      emailCodeError.style.display = 'none';
      emailSendBtn.style.display = 'block';
      emailVerifyBtn.style.display = 'none';
      emailVerifyBtn.disabled = true;
      emailVerifyBtn.textContent = '验证并登录';
      emailVerifyBtn.style.background = '';
      
      if (emailTimer) {
        clearInterval(emailTimer);
        emailTimer = null;
      }
      
      emailResendBtn.disabled = true;
      emailResendTimer.textContent = '60s后重发';
      emailCountdown = 60;
    }
    
    function showEmailError(message) {
      emailError.querySelector('span').textContent = message;
      emailError.style.display = 'flex';
      
      // 输入框错误动画
      emailInput.style.animation = 'none';
      setTimeout(() => {
        emailInput.style.animation = 'shakeError 0.5s ease';
      }, 10);
      setTimeout(() => {
        emailInput.style.animation = '';
      }, 510);
    }
    
    function showEmailCodeError(message) {
      emailCodeError.querySelector('span').textContent = message;
      emailCodeError.style.display = 'flex';
      
      // 输入框错误动画
      emailCodeInput.style.animation = 'none';
      setTimeout(() => {
        emailCodeInput.style.animation = 'shakeError 0.5s ease';
      }, 10);
      setTimeout(() => {
        emailCodeInput.style.animation = '';
      }, 510);
    }
    
    function startEmailCountdown() {
      if (emailTimer) {
        clearInterval(emailTimer);
      }
      
      emailCountdown = 60;
      emailResendBtn.disabled = true;
      emailResendTimer.textContent = emailCountdown + 's后重发';
      
      emailTimer = setInterval(() => {
        emailCountdown--;
        emailResendTimer.textContent = emailCountdown + 's后重发';
        
        if (emailCountdown <= 0) {
          clearInterval(emailTimer);
          emailTimer = null;
          emailResendBtn.disabled = false;
          emailResendTimer.textContent = '重发';
        }
      }, 1000);
    }
  });

/**
 * 隐藏登录弹层
 */
function hideLoginModal() {
  const loginModal = document.getElementById('login-modal');
  
  if (!loginModal) return;
  
  // 添加淡出动画
  loginModal.classList.add('fade-out');
  
  setTimeout(() => {
    loginModal.classList.add('hidden');
    loginModal.classList.remove('fade-out');
  }, 400);
  
  log('登录弹层已隐藏');
}

/**
 * 显示登录弹层
 */
function showLoginModal() {
  const loginModal = document.getElementById('login-modal');
  
  if (!loginModal) return;
  
  // 显示弹层
  loginModal.classList.remove('hidden');
  
  log('登录弹层已显示');
}

// ========================================
// 悬浮按钮拖拽功能 (已停用，使用新的内联样式按钮)
// ========================================

// ========================================
// 核心功能
// ========================================

/**
 * 加载主应用
 * @returns {Promise}
 */
async function loadMainApp() {
  log('开始加载主应用...');
  
  return new Promise((resolve, reject) => {
    // 设置超时
    const timeoutId = setTimeout(() => {
      reject(new Error('主应用加载超时'));
    }, CONFIG.loadTimeout);
    
    // 创建脚本元素
    const script = document.createElement('script');
    script.type = 'module';
    script.src = CONFIG.mainAppPath;
    
    // 加载成功
    script.onload = () => {
      clearTimeout(timeoutId);
      log('主应用加载成功');
      
      // 等待 Vue 应用挂载
      const checkMount = async () => {
        if (isMainAppLoaded()) {
          resolve();
        } else {
          await wait(100);
          checkMount();
        }
      };
      checkMount();
    };
    
    // 加载失败
    script.onerror = (error) => {
      clearTimeout(timeoutId);
      log('主应用加载失败: ' + error.message, 'error');
      reject(error);
    };
    
    // 添加到文档
    document.head.appendChild(script);
  });
}

/**
 * 执行淡出动画并隐藏启动页
 * @returns {Promise}
 */
async function hideSplashScreen() {
  log('开始隐藏启动页...');
  
  const splashScreen = document.getElementById('splash-screen');
  const mainApp = document.getElementById('main-app');
  
  if (!splashScreen) {
    log('未找到启动页元素', 'warn');
    return;
  }
  
  // 添加淡出类
  splashScreen.classList.add('fade-out');
  
  // 等待动画完成
  await wait(800);
  
  // 隐藏启动页
  splashScreen.style.display = 'none';
  
  // 显示主应用
  if (mainApp) {
    mainApp.style.display = 'block';
    mainApp.classList.add('fade-in');
  }
  
  log('启动页已隐藏，主应用已显示');
}

/**
 * 进入主应用
 */
function enterMainApp() {
  log('准备进入主应用...');
  
  try {
    // 跳转到 Weiming Live Panel 项目
    // 现在明确跳转到 app.html（Vue应用）
    const targetUrl = 'http://localhost:5173/app.html';
    log(`正在跳转到 ${targetUrl}`);
    window.location.href = targetUrl;
    
    log('成功打开主应用');
  } catch (error) {
    log('进入主应用失败: ' + error.message, 'error');
    
    // 显示错误提示
    alert('打开失败，请确保开发服务器已启动 (npm run dev)');
  }
}

/**
 * 初始化
 */
function init() {
  log('初始化启动动画...');
  
  // 初始化登录弹层
  initLoginModal();
  
  // 初始化登录状态管理
  LoginState.initClickOutside();
  updateLoginStatusUI();
  
  // 悬浮按钮现在使用 onclick 直接绑定，无需额外初始化
  
  // 获取进入按钮
  const enterBtn = document.getElementById('enter-btn');
  
  if (!enterBtn) {
    log('未找到进入按钮元素', 'error');
    return;
  }
  
  // 绑定点击事件
  enterBtn.addEventListener('click', () => {
    log('用户点击了进入按钮');
    enterMainApp();
  });
  
  // 键盘支持（回车键）
  enterBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      log('用户按下了回车键');
      enterMainApp();
    }
  });
  
  // 支持空格键快捷进入
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target === document.body) {
      log('全局回车键触发');
      enterMainApp();
    }
  });
  
  // 自动进入（可选功能）
  if (CONFIG.autoEnter) {
    log('启用自动进入功能');
    setTimeout(() => {
      log('自动进入倒计时结束');
      enterMainApp();
    }, CONFIG.autoEnterDelay);
  }
  
  log('初始化完成');
}

// ========================================
// 启动
// ========================================

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM 已加载，直接初始化
  init();
}

// 简单的回首页函数
function goToHomePage() {
  console.log('跳转到主官网首页...');
  
  try {
    // 现在splash.html和index.html在同一个目录
    // 直接跳转到index.html即可
    window.location.href = 'index.html';
  } catch (error) {
    console.error('跳转失败:', error);
    alert('无法跳转到首页，请手动访问 index.html');
  }
}

// 初始化回首页按钮
function initHomeButtons() {
  // 找到所有回首页按钮
  const homeButtons = document.querySelectorAll('.home-btn, #floating-home-btn, .logo');
  
  homeButtons.forEach(button => {
    // 防止重复绑定
    if (button.getAttribute('data-home-bound')) return;
    
    // 标记已绑定
    button.setAttribute('data-home-bound', 'true');
    
    // 添加点击事件
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      goToHomePage();
    });
  });
}

// 修改初始化函数，添加回首页按钮初始化
const originalInit = init;
init = function() {
  originalInit();
  initHomeButtons();
};

// 导出给外部使用（如果需要）
window.SplashScreen = {
  enter: enterMainApp,
  hide: hideSplashScreen,
  showLogin: showLoginModal,
  hideLogin: hideLoginModal,
  goHome: goToHomePage,
  config: CONFIG,
  login: LoginState
};
