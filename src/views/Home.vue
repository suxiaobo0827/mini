<template>
  <section
    ref="pageRef"
    class="login-page"
    @pointermove="handlePointerMove"
    @pointerleave="resetCardTilt"
  >
    <div class="login-page__grid" aria-hidden="true"></div>
    <div class="login-page__noise" aria-hidden="true"></div>
    <div class="ambient-orb ambient-orb--one" aria-hidden="true"></div>
    <div class="ambient-orb ambient-orb--two" aria-hidden="true"></div>
    <div class="ambient-orb ambient-orb--three" aria-hidden="true"></div>

    <main class="login-page__content">
      <header class="brand-panel">
        <div class="brand-mark" aria-hidden="true">
          <div class="brand-mark__halo"></div>
          <div class="brand-mark__ring brand-mark__ring--outer"></div>
          <div class="brand-mark__ring brand-mark__ring--inner"></div>
          <div class="brand-mark__core">
            <svg viewBox="0 0 48 48" role="img">
              <path
                d="M14 14.5h20a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H24l-7.5 5v-5H14a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4Z"
                fill="none"
                stroke="currentColor"
                stroke-width="2.6"
                stroke-linejoin="round"
              />
              <circle cx="18" cy="24" r="1.8" fill="currentColor" />
              <circle cx="24" cy="24" r="1.8" fill="currentColor" />
              <circle cx="30" cy="24" r="1.8" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div class="brand-copy">
          <div class="brand-copy__eyebrow">
            <span class="brand-copy__dot"></span>
            WEUI × GSAP EXPERIENCE
          </div>
          <h1>欢迎回来</h1>
          <p>让每一次登录，都像进入一个新的数字空间。</p>
        </div>
      </header>

      <section ref="cardRef" class="login-card">
        <div class="login-card__border" aria-hidden="true"></div>
        <div class="login-card__shine" aria-hidden="true"></div>

        <div class="login-card__header">
          <div>
            <span class="login-card__caption">ACCOUNT ACCESS</span>
            <h2>登录账号</h2>
          </div>
          <div class="login-card__status">
            <span></span>
            安全连接
          </div>
        </div>

        <div class="weui-cells weui-cells_form login-form">
          <label class="weui-cell weui-cell_active login-field">
            <div class="weui-cell__hd login-field__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M7.8 3.8h2.1l1.1 3.1-1.7 1.6a13.5 13.5 0 0 0 6.2 6.2l1.6-1.7 3.1 1.1v2.1c0 1.1-.9 2-2 2C10.7 18.2 5.8 13.3 5.8 5.8c0-1.1.9-2 2-2Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="weui-cell__bd">
              <span class="login-field__label">手机号</span>
              <input
                v-model.trim="phone"
                class="weui-input login-field__input"
                type="tel"
                inputmode="numeric"
                maxlength="11"
                placeholder="请输入手机号"
                autocomplete="tel"
              />
            </div>
          </label>

          <label class="weui-cell weui-cell_active login-field">
            <div class="weui-cell__hd login-field__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path
                  d="M8.5 10V7.6a3.5 3.5 0 0 1 7 0V10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
                <circle cx="12" cy="15" r="1.3" fill="currentColor" />
              </svg>
            </div>
            <div class="weui-cell__bd">
              <span class="login-field__label">登录密码</span>
              <input
                v-model="password"
                class="weui-input login-field__input"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
            </div>
            <button
              class="weui-cell__ft login-field__eye"
              type="button"
              :aria-label="showPassword ? '隐藏密码' : '显示密码'"
              @click.prevent="showPassword = !showPassword"
            >
              {{ showPassword ? '隐藏' : '显示' }}
            </button>
          </label>
        </div>

        <div class="login-options">
          <label class="weui-agree login-agree">
            <input v-model="agreed" type="checkbox" class="weui-agree__checkbox" />
            <span class="weui-agree__text">保持登录</span>
          </label>
          <button class="login-link" type="button">忘记密码？</button>
        </div>

        <div class="login-actions">
          <button
            class="weui-btn weui-btn_primary login-button login-button--primary"
            :class="{ 'login-button--loading': loading }"
            :disabled="loading"
            type="button"
            @click="handleLogin"
          >
            <span v-if="loading" class="login-button__spinner" aria-hidden="true"></span>
            <span>{{ loading ? '正在建立安全连接' : '立即登录' }}</span>
            <span v-if="!loading" class="login-button__arrow" aria-hidden="true">→</span>
          </button>

          <button
            class="weui-btn weui-btn_default login-button login-button--wechat"
            type="button"
            :disabled="loading"
            @click="handleQuickLogin"
          >
            <span class="wechat-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M9.9 5.2c-4 0-7.2 2.5-7.2 5.7 0 1.8 1 3.4 2.7 4.5l-.7 2.2 2.5-1.3c.9.3 1.8.4 2.7.4.2 0 .5 0 .7-.1a5.9 5.9 0 0 1-.2-1.5c0-3.3 3.1-5.9 6.9-5.9h.2c-.9-2.4-3.9-4-7.6-4Zm-2.4 4a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm4.8 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z"
                  fill="currentColor"
                />
                <path
                  d="M21.3 15.1c0-2.6-2.7-4.7-6-4.7s-6 2.1-6 4.7 2.7 4.7 6 4.7c.7 0 1.5-.1 2.1-.3l2.1 1.1-.6-1.8c1.5-.9 2.4-2.2 2.4-3.7Zm-8-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Zm4 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            微信快捷登录
          </button>
        </div>

        <transition name="status-fade">
          <div
            v-if="message"
            :class="['login-message', `login-message--${messageType}`]"
            role="status"
          >
            <span>{{ messageType === 'success' ? '✓' : '!' }}</span>
            {{ message }}
          </div>
        </transition>

        <div class="login-card__divider">
          <span></span>
          <em>SECURE LOGIN</em>
          <span></span>
        </div>

        <div class="security-row">
          <div class="security-item">
            <span class="security-item__icon">01</span>
            <div>
              <strong>加密传输</strong>
              <small>TLS PROTECTED</small>
            </div>
          </div>
          <div class="security-item">
            <span class="security-item__icon">02</span>
            <div>
              <strong>隐私保护</strong>
              <small>PRIVACY FIRST</small>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="login-footnote">
      <span class="login-footnote__line"></span>
      <p>Mini Lab · Digital Experience 2026</p>
      <span class="login-footnote__line"></span>
    </footer>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const pageRef = ref(null)
const cardRef = ref(null)
const phone = ref('')
const password = ref('')
const agreed = ref(true)
const showPassword = ref(false)
const loading = ref(false)
const message = ref('')
const messageType = ref('error')

let animationContext
let loginTimer

const showMessage = (text, type = 'error') => {
  message.value = text
  messageType.value = type
}

const playSuccessPulse = () => {
  if (!cardRef.value) return

  gsap.timeline()
    .to(cardRef.value, {
      scale: 1.015,
      duration: 0.16,
      ease: 'power2.out',
    })
    .to(cardRef.value, {
      scale: 1,
      duration: 0.38,
      ease: 'elastic.out(1, 0.55)',
    })
}

const finishDemoLogin = (text) => {
  loading.value = true
  message.value = ''

  window.clearTimeout(loginTimer)
  loginTimer = window.setTimeout(() => {
    loading.value = false
    showMessage(text, 'success')
    nextTick(playSuccessPulse)
  }, 900)
}

const handleLogin = () => {
  if (!phone.value || !password.value) {
    showMessage('请输入手机号和登录密码')
    return
  }

  if (!/^1\d{10}$/.test(phone.value)) {
    showMessage('请输入正确的 11 位手机号')
    return
  }

  if (!agreed.value) {
    showMessage('请先确认保持登录选项')
    return
  }

  finishDemoLogin('验证通过，欢迎回来')
}

const handleQuickLogin = () => {
  finishDemoLogin('微信授权模拟成功')
}

const handlePointerMove = (event) => {
  if (!cardRef.value || window.matchMedia('(pointer: coarse)').matches) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5
  const shine = cardRef.value.querySelector('.login-card__shine')

  gsap.to(cardRef.value, {
    rotateY: x * 7,
    rotateX: y * -6,
    duration: 0.45,
    ease: 'power2.out',
  })

  if (shine) {
    gsap.to(shine, {
      xPercent: x * 28,
      yPercent: y * 22,
      duration: 0.45,
      ease: 'power2.out',
    })
  }
}

const resetCardTilt = () => {
  if (!cardRef.value) return

  gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.7,
    ease: 'power3.out',
  })
}

onMounted(() => {
  animationContext = gsap.context(() => {
    gsap.set('.login-card', {
      transformPerspective: 1000,
      transformOrigin: 'center center',
    })

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
    })

    timeline
      .from('.ambient-orb', {
        scale: 0.3,
        opacity: 0,
        duration: 1.25,
        stagger: 0.12,
      })
      .from(
        '.brand-mark',
        {
          scale: 0.4,
          rotate: -24,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.8)',
        },
        '-=0.9',
      )
      .from(
        '.brand-copy > *',
        {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        '-=0.52',
      )
      .from(
        '.login-card',
        {
          y: 48,
          scale: 0.96,
          opacity: 0,
          duration: 0.78,
        },
        '-=0.38',
      )
      .from(
        '.login-field',
        {
          x: -18,
          opacity: 0,
          duration: 0.48,
          stagger: 0.09,
        },
        '-=0.34',
      )
      .from(
        '.login-actions > *, .security-item',
        {
          y: 16,
          opacity: 0,
          duration: 0.44,
          stagger: 0.07,
        },
        '-=0.22',
      )
      .from(
        '.login-footnote',
        {
          y: 12,
          opacity: 0,
          duration: 0.45,
        },
        '-=0.18',
      )

    gsap.to('.brand-mark__ring--outer', {
      rotate: 360,
      duration: 16,
      repeat: -1,
      ease: 'none',
    })

    gsap.to('.brand-mark__ring--inner', {
      rotate: -360,
      duration: 11,
      repeat: -1,
      ease: 'none',
    })

    gsap.to('.brand-mark__halo', {
      scale: 1.22,
      opacity: 0.28,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.ambient-orb--one', {
      x: 26,
      y: -18,
      duration: 4.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.ambient-orb--two', {
      x: -22,
      y: 28,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.ambient-orb--three', {
      x: 18,
      y: 16,
      duration: 3.9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, pageRef.value)
})

onBeforeUnmount(() => {
  window.clearTimeout(loginTimer)
  animationContext?.revert()
})
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
  padding: calc(22px + env(safe-area-inset-top)) 20px calc(18px + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 18% 8%, rgba(25, 181, 123, 0.14), transparent 28%),
    radial-gradient(circle at 84% 30%, rgba(73, 118, 255, 0.16), transparent 25%),
    linear-gradient(155deg, #07131a 0%, #091820 42%, #071118 100%);
  color: #f6fffb;
  isolation: isolate;

  &__content {
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 335px;
    margin: 0 auto;
  }

  &__grid {
    position: absolute;
    z-index: 0;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.024) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.024) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 82%);
  }

  &__noise {
    position: absolute;
    z-index: 1;
    inset: 0;
    pointer-events: none;
    opacity: 0.16;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
    mix-blend-mode: soft-light;
  }
}

.ambient-orb {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(2px);

  &::after {
    position: absolute;
    inset: 18%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: inherit;
    content: '';
  }

  &--one {
    top: -38px;
    right: -58px;
    width: 170px;
    height: 170px;
    border: 1px solid rgba(41, 203, 139, 0.14);
    background: radial-gradient(circle at 34% 36%, rgba(42, 235, 156, 0.2), rgba(17, 120, 95, 0.02) 68%);
    box-shadow: 0 0 70px rgba(31, 207, 141, 0.08);
  }

  &--two {
    top: 310px;
    left: -86px;
    width: 180px;
    height: 180px;
    border: 1px solid rgba(93, 138, 255, 0.12);
    background: radial-gradient(circle at 60% 40%, rgba(78, 127, 255, 0.18), rgba(38, 79, 166, 0.01) 70%);
  }

  &--three {
    right: -42px;
    bottom: 52px;
    width: 112px;
    height: 112px;
    border: 1px solid rgba(71, 239, 188, 0.1);
    background: radial-gradient(circle, rgba(36, 210, 150, 0.11), transparent 68%);
  }
}

.brand-panel {
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 12px 4px 22px;
}

.brand-mark {
  position: relative;
  display: grid;
  flex: 0 0 74px;
  width: 74px;
  height: 74px;
  place-items: center;

  &__halo {
    position: absolute;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: rgba(42, 225, 156, 0.26);
    filter: blur(20px);
  }

  &__ring {
    position: absolute;
    border-radius: 50%;

    &::before,
    &::after {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #62f1bf;
      box-shadow: 0 0 12px rgba(98, 241, 191, 0.75);
      content: '';
    }
  }

  &__ring--outer {
    inset: 0;
    border: 1px dashed rgba(107, 231, 191, 0.34);

    &::before {
      top: 6px;
      left: 14px;
    }

    &::after {
      right: 8px;
      bottom: 15px;
    }
  }

  &__ring--inner {
    inset: 9px;
    border: 1px solid rgba(110, 166, 255, 0.24);

    &::before {
      top: 3px;
      right: 10px;
      width: 4px;
      height: 4px;
      background: #7aa4ff;
      box-shadow: 0 0 10px rgba(122, 164, 255, 0.72);
    }

    &::after {
      display: none;
    }
  }

  &__core {
    position: relative;
    z-index: 2;
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border: 1px solid rgba(125, 242, 202, 0.28);
    border-radius: 16px;
    background: linear-gradient(145deg, rgba(40, 224, 157, 0.19), rgba(29, 84, 76, 0.22));
    color: #b9ffe7;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.14),
      0 12px 28px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(12px);

    svg {
      width: 29px;
      height: 29px;
    }
  }
}

.brand-copy {
  min-width: 0;

  &__eyebrow {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 7px;
    color: rgba(183, 255, 228, 0.62);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 1.45px;
  }

  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #50e8ad;
    box-shadow: 0 0 10px rgba(80, 232, 173, 0.8);
  }

  h1 {
    margin: 0;
    font-size: 26px;
    font-weight: 650;
    letter-spacing: -0.6px;
    line-height: 1.2;
  }

  p {
    margin: 7px 0 0;
    color: rgba(221, 237, 232, 0.56);
    font-size: 11px;
    line-height: 1.55;
  }
}

.login-card {
  position: relative;
  overflow: hidden;
  padding: 24px 20px 20px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 28px;
  background: linear-gradient(150deg, rgba(20, 38, 45, 0.93), rgba(10, 25, 32, 0.9));
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  will-change: transform;

  &__border {
    position: absolute;
    z-index: 0;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(79, 236, 178, 0.34), transparent 30%, transparent 70%, rgba(94, 138, 255, 0.18));
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  &__shine {
    position: absolute;
    z-index: 0;
    top: -110px;
    left: 48%;
    width: 210px;
    height: 210px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(83, 242, 184, 0.11), transparent 70%);
    filter: blur(8px);
  }

  &__header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;

    h2 {
      margin: 5px 0 0;
      color: #f4fff9;
      font-size: 21px;
      font-weight: 620;
      letter-spacing: -0.4px;
    }
  }

  &__caption {
    color: rgba(169, 255, 222, 0.44);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 1.35px;
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 4px;
    color: rgba(197, 229, 217, 0.5);
    font-size: 9px;

    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ee7aa;
      box-shadow: 0 0 10px rgba(78, 231, 170, 0.8);
    }
  }

  &__divider {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 18px 0 15px;

    span {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(178, 214, 202, 0.14));

      &:last-child {
        background: linear-gradient(90deg, rgba(178, 214, 202, 0.14), transparent);
      }
    }

    em {
      color: rgba(183, 220, 208, 0.32);
      font-size: 7px;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 1.2px;
    }
  }
}

.login-form.weui-cells {
  position: relative;
  z-index: 1;
  overflow: visible;
  margin: 0;
  background: transparent;

  &::before,
  &::after {
    display: none;
  }
}

.login-field.weui-cell {
  position: relative;
  min-height: 64px;
  margin-bottom: 11px;
  padding: 10px 13px;
  border: 1px solid rgba(193, 224, 213, 0.1);
  border-radius: 17px;
  background: rgba(255, 255, 255, 0.035);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;

  &::before,
  &::after {
    display: none;
  }

  &:focus-within {
    border-color: rgba(78, 231, 170, 0.46);
    background: rgba(61, 191, 143, 0.075);
    box-shadow: 0 0 0 3px rgba(73, 225, 169, 0.055);
  }
}

.login-field {
  &__icon {
    display: grid;
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    margin-right: 10px;
    place-items: center;
    border: 1px solid rgba(104, 226, 184, 0.12);
    border-radius: 11px;
    background: rgba(64, 201, 151, 0.065);
    color: rgba(168, 244, 217, 0.66);

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__label {
    display: block;
    margin-bottom: 3px;
    color: rgba(193, 220, 211, 0.4);
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  &__input.weui-input {
    height: 23px;
    color: #edfff8;
    font-size: 13px;
    line-height: 23px;
    caret-color: #55e7af;

    &::placeholder {
      color: rgba(191, 213, 206, 0.26);
    }
  }

  &__eye.weui-cell__ft {
    padding: 8px 0 8px 10px;
    border: 0;
    background: transparent;
    color: rgba(177, 225, 208, 0.48);
    font-size: 10px;
    cursor: pointer;

    &::after {
      display: none;
    }
  }
}

.login-options {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 2px 16px;
}

.login-agree.weui-agree {
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
  color: rgba(195, 220, 211, 0.45);
  font-size: 10px;

  .weui-agree__checkbox {
    width: 14px;
    height: 14px;
    margin-right: 6px;
    accent-color: #32cd91;
  }

  .weui-agree__text {
    color: inherit;
  }
}

.login-link {
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: rgba(103, 230, 183, 0.72);
  font-size: 10px;
}

.login-actions {
  position: relative;
  z-index: 1;
}

.login-button.weui-btn {
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  border: 0;
  border-radius: 15px;
  font-size: 13px;
  font-weight: 650;
  line-height: 48px;
  letter-spacing: 0.2px;

  &::after {
    display: none;
  }

  & + & {
    margin-top: 10px;
  }

  &:active {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.72;
  }

  &--primary {
    position: relative;
    overflow: hidden;
    background: linear-gradient(100deg, #26c986 0%, #43dfaa 50%, #5ee5b8 100%);
    color: #052219;
    box-shadow: 0 13px 28px rgba(39, 202, 135, 0.19);

    &::before {
      position: absolute;
      top: -18px;
      left: -40px;
      width: 34px;
      height: 84px;
      background: rgba(255, 255, 255, 0.3);
      content: '';
      filter: blur(12px);
      transform: rotate(25deg);
      animation: button-shimmer 3.4s infinite ease-in-out;
    }
  }

  &--wechat {
    border: 1px solid rgba(207, 232, 223, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(236, 255, 248, 0.76);
    box-shadow: none;
  }

  &__arrow {
    margin-left: 2px;
    font-size: 17px;
    font-weight: 400;
  }

  &__spinner {
    width: 15px;
    height: 15px;
    border: 2px solid rgba(3, 36, 24, 0.22);
    border-top-color: #063425;
    border-radius: 50%;
    animation: login-spin 0.75s linear infinite;
  }
}

.wechat-badge {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 8px;
  background: rgba(7, 193, 96, 0.13);
  color: #62e69e;

  svg {
    width: 17px;
    height: 17px;
  }
}

.login-message {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 34px;
  align-items: center;
  gap: 7px;
  margin-top: 11px;
  padding: 8px 10px;
  border-radius: 11px;
  font-size: 10px;
  line-height: 1.5;

  span {
    display: grid;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    place-items: center;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 700;
  }

  &--error {
    background: rgba(255, 111, 101, 0.08);
    color: rgba(255, 184, 178, 0.82);

    span {
      background: rgba(255, 111, 101, 0.12);
      color: #ff9c93;
    }
  }

  &--success {
    background: rgba(69, 225, 164, 0.08);
    color: rgba(170, 248, 216, 0.84);

    span {
      background: rgba(69, 225, 164, 0.12);
      color: #63e7b1;
    }
  }
}

.security-row {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.security-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
  padding: 9px;
  border: 1px solid rgba(255, 255, 255, 0.055);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);

  &__icon {
    display: grid;
    flex: 0 0 27px;
    width: 27px;
    height: 27px;
    place-items: center;
    border-radius: 9px;
    background: rgba(53, 212, 151, 0.07);
    color: rgba(102, 235, 185, 0.58);
    font-size: 8px;
    font-weight: 700;
  }

  strong,
  small {
    display: block;
    white-space: nowrap;
  }

  strong {
    color: rgba(234, 251, 245, 0.62);
    font-size: 9px;
    font-weight: 550;
  }

  small {
    margin-top: 2px;
    color: rgba(173, 203, 193, 0.27);
    font-size: 6px;
    letter-spacing: 0.55px;
  }
}

.login-footnote {
  position: relative;
  z-index: 3;
  display: flex;
  width: 100%;
  max-width: 335px;
  align-items: center;
  gap: 9px;
  margin: 17px auto 0;
  color: rgba(176, 207, 197, 0.25);

  p {
    flex: 0 0 auto;
    margin: 0;
    font-size: 7px;
    letter-spacing: 0.65px;
    text-transform: uppercase;
  }

  &__line {
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, transparent, rgba(168, 207, 193, 0.1));

    &:last-child {
      background: linear-gradient(90deg, rgba(168, 207, 193, 0.1), transparent);
    }
  }
}

.status-fade-enter-active,
.status-fade-leave-active {
  transition: all 0.25s ease;
}

.status-fade-enter-from,
.status-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

@keyframes login-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes button-shimmer {
  0%,
  58% {
    left: -42px;
    opacity: 0;
  }

  68% {
    opacity: 0.7;
  }

  82%,
  100% {
    left: 108%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
</style>
