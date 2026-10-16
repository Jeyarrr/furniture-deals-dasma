import { useEffect, useRef } from 'react'

let locks = 0
let originalOverflow = ''

// Shared lock prevents nested product/inquiry dialogs from unlocking the page early.
export function useModal(open) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!open) return
    const trigger = document.activeElement
    if (locks++ === 0) { originalOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden' }
    if (!element.open) element.showModal()
    return () => {
      if (element.open) element.close()
      if (--locks === 0) document.body.style.overflow = originalOverflow
      if (trigger instanceof HTMLElement && trigger.isConnected && !trigger.closest('dialog:not([open])')) trigger.focus({ preventScroll: true })
      else document.querySelector('.inquiry-link')?.focus({ preventScroll: true })
    }
  }, [open])
  return ref
}
