<template>
  <section ref="pageRef" class="login-page">
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-bg__glow hero-bg__glow--one"></div>
      <div class="hero-bg__glow hero-bg__glow--two"></div>
      <div class="hero-bg__mesh"></div>
    </div>

    <main class="login-shell">
      <header class="brand-block">
        <div ref="logoRef" class="brand-logo" aria-hidden="true">
          <span class="brand-logo__shine"></span>
          <svg viewBox="0 0 40 40">
            <path d="M10 11.5h20a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-8.2L15 33v-4.5h-5a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4Z" />
            <circle cx="14" cy="20" r="1.6" />
            <circle cx="20" cy="20" r="1.6" />
            <circle cx="26" cy="20" r="1.6" />
          </svg>
        </div>

        <div class="brand-block__copy">
          <span class="brand-block__tag">MINI SPACE</span>
          <h1>欢迎回来</h1>
          <p>登录后继续探索你的专属空间</p>
        </div>
      </header>

      <section ref="panelRef" class="login-panel">
        <div class="login-panel__topline" aria-hidden="true"></div>

        <div class="login-panel__heading">
          <div>
            <span>ACCOUNT</span>
            <h2>登录账号</h2>
          </div>
          <div class="secure-badge">
            <i></i>
            安全连接
          </div>
        </div>

        <div class="weui-cells weui-cells_form form-list">
          <label class="weui-cell weui-cell_active form-field" :class="{ 'form-field--focus': focusField === 'phone' }">
            <div class="form-field__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8.2 4.2h2l1.1 3-1.8 1.7a13 13 0 0 0 5.7 5.7l1.7-1.8 3 1.1v2c0 1.2-1 2.1-2.1 2.1C10.6 18 6 13.4 6 6.3c0-1.2 1-2.1 2.2-2.1Z" />
              </svg>
            </div>

            <div class="weui-cell__bd form-field__body">
              <span class="form-field__label">手机号</span>
              <input
                v-model.trim="phone"
                class="weui-input form-field__input"
                type="tel"
                inputmode="numeric"
                maxlength="11"
                placeholder="请输入手机号"
                autocomplete="tel"
                @focus="focusField = 'phone'"
                @blur="focusField = ''"
              />
            </div>
          </label>

          <label class="weui-cell weui-cell_active form-field" :class="{ 'form-field--focus': focusField === 'password' }">
            <div class="form-field__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="10" width="14" height="10" rx="3" />
                <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
                <circle cx="12" cy="15" r="1.25" class="form-field__icon-fill" />
              </svg>
            </div>

            <div class="weui-cell__bd form-field__body">
              <span class="form-field__label">密码</span>
              <input
                v-model="password"
                class="weui-input form-field__input"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入登录密码"
                autocomplete="current-password"
                @focus="focusField = 'password'"
                @blur="focusField = ''"
              />
            </div>

            <button
              class="form-field__action"
              type="button"
              :aria-label="showPassword ? '隐藏密码' : '显示密码'"
              @click.prevent="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" viewBox="0 0 24 24">
                <path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z" />
                <circle cx="12" cy="12" r="2.4" />
              </svg>
              <svg v-else viewBox="0 0 24 24">
                <path d="M4 4l16 16" />
                <path d="M9.3 7.5A9.5 9.5 0 0 1 12 7c5.5 0 8.5 5 8.5 5a13 13 0 0 1-2.2 2.8M6.3 8.2A13 13 0 0 0 3.5 12s3 5 8.5 5c1 0 2-.2 2.8-.5" />
              </svg>
            </button>
          </label>
        </div>

        <div class="form-options">
          <label class="remember-option">
            <input v-model="agreed" type="checkbox" />
            <span class="remember-option__check">
              <svg viewBox="0 0 16 16"><path d="m4 8.2 2.5 2.4L12 5.3" /></svg>
            </span>
            <em>保持登录</em>
          </label>
          <button type="button" class="text-button">忘记密码？</button>
        </div>

        <button
          ref="loginButtonRef"
          class="weui-btn weui-btn_primary login-button"
          :class="{ 'login-button--loading': loading }"
          :disabled="loading"
          type="button"
          @click="handleLogin"
        >
          <span v-if="loading" class="login-button__spinner"></span>
          <span>{{ loading ? '登录中...' : '立即登录' }}</span>
          <svg v-if="!loading" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13M14 7l5 5-5 5" />
          </svg>
        </button>

        <transition name="message-fade">
          <div v-if="message" :class="['form-message', `form-message--${messageType}`]">
            <span>{{ messageType === 'success' ? '✓' : '!' }}</span>
            {{ message }}
          </div>
        </transition>

        <div class="login-divider">
          <span></span>
          <em>其他方式</em>
          <span></span>
        </div>

        <button class="weui-btn weui-btn_default wechat-button" type="button" :disabled="loading" @click="handleQuickLogin">
          <span class="wechat-button__icon">
            <svg viewBox="0 0 24 24">
              <path d="M9.6 4.6c-4.1 0-7.4 2.5-7.4 5.8 0 1.9 1.1 3.6 2.9 4.7l-.7 2.3 2.6-1.3c.8.2 1.7.4 2.6.4h.6a5.9 5.9 0 0 1-.2-1.5c0-3.4 3.1-6.1 7.1-6.1h.5c-.8-2.5-4-4.3-8-4.3Zm-2.4 4.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm4.9 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
              <path d="M21.8 15c0-2.7-2.8-4.9-6.2-4.9s-6.2 2.2-6.2 4.9 2.8 4.9 6.2 4.9c.8 0 1.5-.1 2.2-.3l2.1 1.1-.6-1.9c1.5-.9 2.5-2.3 2.5-3.8Zm-8.2-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Zm4.1 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z" />
            </svg>
          </span>
          微信快捷登录
        </button>

        <p class="agreement-copy">
          登录即代表你同意
          <button type="button">《用户协议》</button>
          和
          <button type="button">《隐私政策》</button>
        </p>
      </section>

      <footer class="page-footer">
        <span class="page-footer__dot"></span>
        <p>数据加密传输 · 隐私安全保护</p>
      </footer>
    </main>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const pageRef = ref(null)
const logoRef = ref(null)
const panelRef = ref(null)
const loginButtonRef = ref(null)

const phone = ref('')
const password = ref('')
const agreed = ref(true)
const showPassword = ref(false)
const focusField = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('error')

let context
let loginTimer

const showMessage = (text, type = 'error') => {
  message.value = text
  messageType.value = type
}

const shakePanel = () => {
  if (!panelRef.value) return
  gsap.fromTo(
    panelRef.value,
    { x: 0 },
    {
      keyframes: [
        { x: -7, duration: 0.07 },
        { x: 6, duration: 0.07 },
        { x: -4, duration: 0.07 },
        { x: 3, duration: 0.07 },
        { x: 0, duration: 0.08 },
      ],
      ease: 'power2.out',
    },
  )
}

const playSuccess = () => {
  if (!loginButtonRef.value) return

  gsap.timeline()
    .to(loginButtonRef.value, { scale: 0.98, duration: 0.1 })
    .to(loginButtonRef.value, { scale: 1.02, duration: 0.18, ease: 'power2.out' })
    .to(loginButtonRef.value, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
}

const runDemoLogin = (successText) => {
  loading.value = true
  message.value = ''
  window.clearTimeout(loginTimer)

  loginTimer = window.setTimeout(() => {
    loading.value = false
    showMessage(successText, 'success')
    nextTick(playSuccess)
  }, 800)
}

const handleLogin = () => {
  if (!phone.value || !password.value) {
    showMessage('请输入手机号和密码')
    shakePanel()
    return
  }

  if (!/^1\d{10}$/.test(phone.value)) {
    showMessage('请输入正确的 11 位手机号')
    shakePanel()
    return
  }

  if (!agreed.value) {
    showMessage('请先勾选保持登录')
    shakePanel()
    return
  }

  runDemoLogin('登录成功，欢迎回来')
}

const handleQuickLogin = () => {
  runDemoLogin('微信授权模拟成功')
}

onMounted(() => {
  context = gsap.context(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

    timeline
      .from('.hero-bg__glow', {
        opacity: 0,
        scale: 0.65,
        duration: 1.1,
        stagger: 0.12,
      })
      .from(
        '.brand-logo',
        {
          y: 18,
          scale: 0.82,
          rotate: -8,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.8)',
        },
        '-=0.65',
      )
      .from(
        '.brand-block__copy > *',
        {
          y: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
        },
        '-=0.4',
      )
      .from(
        '.login-panel',
        {
          y: 42,
          opacity: 0,
          scale: 0.97,
          duration: 0.7,
        },
        '-=0.25',
      )
      .from(
        '.form-field, .form-options, .login-button, .login-divider, .wechat-button, .agreement-copy',
        {
          y: 14,
          opacity: 0,
          duration: 0.42,
          stagger: 0.055,
        },
        '-=0.36',
      )
      .from(
        '.page-footer',
        {
          opacity: 0,
          y: 8,
          duration: 0.4,
        },
        '-=0.15',
      )

    gsap.to('.hero-bg__glow--one', {
      x: 18,
      y: 16,
      scale: 1.08,
      duration: 6.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.hero-bg__glow--two', {
      x: -14,
      y: -12,
      scale: 0.92,
      duration: 7.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.brand-logo__shine', {
      xPercent: 260,
      duration: 2.8,
      repeat: -1,
      repeatDelay: 2.2,
      ease: 'power2.inOut',
    })
  }, pageRef)
})

onBeforeUnmount(() => {
  context?.revert()
  window.clearTimeout(loginTimer)
})
</script>

<style scoped lang="scss">
.login-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background: #f4f6f8;
  color: #151819;
}

.hero-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 338px;
  overflow: hidden;
  border-radius: 0 0 42px 42px;
  background:
    radial-gradient(circle at 20% 15%, rgba(56, 231, 154, 0.13), transparent 36%),
    linear-gradient(145deg, #131918 0%, #0b1111 58%, #111b19 100%);

  &__mesh {
    position: absolute;
    inset: 0;
    opacity: 0.22;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(to bottom, #000 0%, transparent 88%);
  }

  &__glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(2px);

    &--one {
      top: -70px;
      right: -58px;
      width: 210px;
      height: 210px;
      background: radial-gradient(circle, rgba(60, 255, 174, 0.24), rgba(60, 255, 174, 0));
    }

    &--two {
      top: 126px;
      left: -84px;
      width: 190px;
      height: 190px;
      background: radial-gradient(circle, rgba(85, 151, 255, 0.18), rgba(85, 151, 255, 0));
    }
  }
}

.login-shell {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  padding: max(28px, env(safe-area-inset-top)) 20px calc(24px + env(safe-area-inset-bottom));
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 15px;
  min-height: 146px;
  color: #fff;
}

.brand-logo {
  position: relative;
  display: grid;
  flex: 0 0 58px;
  width: 58px;
  height: 58px;
  overflow: hidden;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 19px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 14px 34px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);

  svg {
    position: relative;
    z-index: 1;
    width: 31px;
    height: 31px;
    fill: none;
    stroke: #9effcf;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;

    circle {
      fill: #9effcf;
      stroke: none;
    }
  }

  &__shine {
    position: absolute;
    top: -20%;
    left: -60%;
    width: 26px;
    height: 140%;
    transform: rotate(22deg);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  }
}

.brand-block__copy {
  min-width: 0;

  h1 {
    margin: 5px 0 0;
    font-size: 31px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.7px;
  }

  p {
    margin: 7px 0 0;
    color: rgba(255, 255, 255, 0.57);
    font-size: 13px;
    line-height: 1.55;
  }
}

.brand-block__tag {
  color: #7df5bc;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.1px;
}

.login-panel {
  position: relative;
  width: 100%;
  padding: 26px 20px 22px;
  overflow: hidden;
  border: 1px solid rgba(17, 27, 25, 0.06);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow:
    0 24px 70px rgba(31, 45, 42, 0.13),
    0 4px 14px rgba(31, 45, 42, 0.04);
  backdrop-filter: blur(24px);

  &__topline {
    position: absolute;
    top: 0;
    left: 50%;
    width: 82px;
    height: 3px;
    transform: translateX(-50%);
    border-radius: 0 0 10px 10px;
    background: linear-gradient(90deg, #8ef8c6, #27d884);
  }
}

.login-panel__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;

  span {
    color: #9aa29f;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
  }

  h2 {
    margin: 4px 0 0;
    color: #151918;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
  }
}

.secure-badge {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
  padding: 7px 9px;
  border-radius: 20px;
  background: #f1faf5;
  color: #5f7e6e;
  font-size: 10px;
  font-weight: 600;

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #27d884;
    box-shadow: 0 0 0 4px rgba(39, 216, 132, 0.11);
  }
}

.form-list.weui-cells {
  margin: 0;
  overflow: visible;
  background: transparent;

  &::before,
  &::after {
    display: none;
  }
}

.form-field.weui-cell {
  display: flex;
  width: 100%;
  min-height: 62px;
  margin: 0 0 12px;
  padding: 0 14px;
  border: 1px solid #e9edeb;
  border-radius: 18px;
  background: #f7f9f8;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &::before,
  &::after {
    display: none;
  }

  &:active {
    background: #f7f9f8;
  }

  &--focus {
    border-color: rgba(32, 197, 120, 0.55);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(39, 216, 132, 0.09);
    transform: translateY(-1px);

    .form-field__icon {
      color: #20bf74;
      background: #eaf9f1;
    }

    .form-field__label {
      color: #20a765;
    }
  }
}

.form-field__icon {
  display: grid;
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  margin-right: 11px;
  place-items: center;
  border-radius: 12px;
  background: #edf2ef;
  color: #6f7c76;
  transition: 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .form-field__icon-fill {
    fill: currentColor;
    stroke: none;
  }
}

.form-field__body {
  min-width: 0;
}

.form-field__label {
  display: block;
  margin-bottom: 2px;
  color: #8d9792;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  transition: color 0.2s ease;
}

.form-field__input.weui-input {
  display: block;
  width: 100% !important;
  height: 24px;
  min-height: 0;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  outline: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #1b211e !important;
  font-size: 14px;
  line-height: 24px;

  &::placeholder {
    color: #c0c6c3;
  }
}

.form-field__action {
  display: grid;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  margin-left: 8px;
  padding: 0;
  place-items: center;
  border: 0;
  background: transparent;
  color: #98a29d;

  svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 2px 1px 18px;
}

.remember-option {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;

    &:checked + .remember-option__check {
      border-color: #23cb7b;
      background: #23cb7b;
      color: #fff;
    }
  }

  em {
    color: #7e8984;
    font-size: 12px;
    font-style: normal;
  }
}

.remember-option__check {
  display: grid;
  width: 18px;
  height: 18px;
  place-items: center;
  border: 1px solid #dce2df;
  border-radius: 6px;
  background: #fff;
  color: transparent;
  transition: 0.2s ease;

  svg {
    width: 12px;
    height: 12px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.text-button,
.agreement-copy button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #1eb66d;
}

.text-button {
  font-size: 12px;
  font-weight: 600;
}

.login-button.weui-btn {
  display: flex !important;
  width: 100% !important;
  max-width: none !important;
  height: 54px;
  margin: 0 !important;
  padding: 0 20px !important;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0 !important;
  border-radius: 17px !important;
  background: linear-gradient(135deg, #20d179 0%, #10b964 100%) !important;
  box-shadow: 0 14px 28px rgba(23, 190, 105, 0.22) !important;
  color: #fff !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  line-height: 54px !important;
  letter-spacing: 0.2px;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    opacity 0.16s ease;

  &::after {
    display: none !important;
  }

  &:active {
    transform: scale(0.985);
    box-shadow: 0 8px 18px rgba(23, 190, 105, 0.18) !important;
  }

  &:disabled {
    opacity: 0.72;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.login-button__spinner {
  width: 17px;
  height: 17px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.form-message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 11px;
  padding: 9px 11px;
  border-radius: 12px;
  font-size: 11px;
  line-height: 1.4;

  span {
    display: grid;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    place-items: center;
    border-radius: 50%;
    font-weight: 700;
  }

  &--error {
    background: #fff2f1;
    color: #c94e46;

    span {
      background: #ffdeda;
    }
  }

  &--success {
    background: #edf9f2;
    color: #268357;

    span {
      background: #d9f3e4;
    }
  }
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 20px 0 14px;

  span {
    height: 1px;
    flex: 1;
    background: #edf0ee;
  }

  em {
    flex: 0 0 auto;
    color: #a5ada9;
    font-size: 10px;
    font-style: normal;
  }
}

.wechat-button.weui-btn {
  display: flex !important;
  width: 100% !important;
  max-width: none !important;
  height: 50px;
  margin: 0 !important;
  padding: 0 18px !important;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid #e7ebe9 !important;
  border-radius: 16px !important;
  background: #fff !important;
  box-shadow: none !important;
  color: #303733 !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  line-height: 50px !important;

  &::after {
    display: none !important;
  }

  &:active {
    background: #f7f9f8 !important;
  }
}

.wechat-button__icon {
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 9px;
  background: #e9f9f0;
  color: #1ec56f;

  svg {
    width: 19px;
    height: 19px;
    fill: currentColor;
  }
}

.agreement-copy {
  margin: 15px 0 0;
  color: #adb4b0;
  font-size: 9px;
  line-height: 1.6;
  text-align: center;

  button {
    font-size: inherit;
  }
}

.page-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 17px 0 0;
  color: #a1aaa5;

  p {
    margin: 0;
    font-size: 9px;
    letter-spacing: 0.4px;
  }
}

.page-footer__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #2bd17d;
  box-shadow: 0 0 0 4px rgba(43, 209, 125, 0.1);
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: 0.22s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-height: 720px) {
  .login-shell {
    padding-top: max(18px, env(safe-area-inset-top));
  }

  .brand-block {
    min-height: 118px;
  }

  .hero-bg {
    height: 292px;
  }

  .login-panel {
    padding-top: 22px;
    padding-bottom: 18px;
  }

  .form-field.weui-cell {
    min-height: 58px;
  }
}

@media (min-width: 520px) {
  .login-shell {
    max-width: 430px;
    margin: 0 auto;
  }
}
</style>
