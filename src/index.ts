import type { Directive } from 'petite-vue/dist/types/directives'
import { transition, Reason } from './utils'

function splitClasses(classes: string = '') {
  return classes === null
    ? undefined
    : classes.split(' ').filter((className) => className.trim().length > 1)
}

export const transitionDirective: Directive<any> = ({
  el,
  arg, // e.g. v-transition:foo -> "foo"
  exp, // e.g. v-transition="x" then this would be "x"
  modifiers, // e.g. v-transition.mod -> { mod: true }
  get, // evaluate the expression and get its value e.g. ctx.get(`${ctx.exp} + 10`) evaluate arbitrary expression in current scope
  effect,
}) => {
  const initialDisplay = el.style.display
  if (arg === 'show') {
    el.style.display = get() ? initialDisplay : 'none'
  }
  // transition map
  const tmap = new Map()
  tmap.set(arg, [exp, modifiers])
  if (arg !== 'show' && arg) el.setAttribute(arg, exp)
  let isTransitioning = false
  let tr: () => void | undefined,
    enterClasses: string[] | undefined,
    enterFromClasses: string[] | undefined,
    enterToClasses: string[] | undefined,
    enteredClasses: string[] | undefined,
    leaveClasses: string[] | undefined,
    leaveFromClasses: string[] | undefined,
    leaveToClasses: string[] | undefined

  effect(() => {
    if (arg === 'show') {
      if (!enterClasses)
        enterClasses = splitClasses(el.getAttribute('enter') as string)
      if (!enterFromClasses)
        enterFromClasses = splitClasses(el.getAttribute('enter-from') as string)
      if (!enterToClasses)
        enterToClasses = splitClasses(el.getAttribute('enter-to') as string)
      if (!enteredClasses)
        enteredClasses = splitClasses(
          el.getAttribute('entered') || (el.getAttribute('enter-to') as string)
        )
      if (!leaveClasses)
        leaveClasses = splitClasses(
          el.getAttribute('leave') || (el.getAttribute('enter') as string)
        )
      if (!leaveFromClasses)
        leaveFromClasses = splitClasses(
          el.getAttribute('leave-from') ||
            (el.getAttribute('enter-to') as string)
        )
      if (!leaveToClasses)
        leaveToClasses = splitClasses(
          el.getAttribute('leave-to') ||
            (el.getAttribute('enter-from') as string)
        )
      get() && (el.style.display = initialDisplay)
      if (
        enterClasses &&
        enterFromClasses &&
        enterToClasses &&
        enteredClasses
      ) {
        if (isTransitioning) {
          if (tr) tr()
          isTransitioning = false
        }
        if (get() && !isTransitioning) {
          isTransitioning = true
          tr = transition(
            el,
            enterClasses,
            enterFromClasses,
            enterToClasses,
            enteredClasses,
            (reason) => {
              if (reason === Reason.Finished) isTransitioning = false
            }
          )
        } else if (!isTransitioning) {
          isTransitioning = true
          tr = transition(
            el,
            // @ts-ignore
            leaveClasses,
            leaveFromClasses,
            leaveToClasses,
            enteredClasses,
            (reason) => {
              if (reason !== Reason.Finished) return
              isTransitioning = false
              el.style.display = 'none'
              const e = new CustomEvent('after-leave')
              el.dispatchEvent(e)
            }
          )
        }
      }
    }
  })
}

export default transitionDirective
