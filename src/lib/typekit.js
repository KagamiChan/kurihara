const install = d => {
  const config = {
    kitId: 'vkp6jvo',
    scriptTimeout: 3000,
    async: true,
  }

  const h = d.documentElement
  const t = setTimeout(() => {
    h.className = `${h.className.replace(/\bwf-loading\b/g, '')} wf-inactive`
  }, config.scriptTimeout)
  const tk = d.createElement('script')
  let f = false
  const s = d.getElementsByTagName('script')[0]
  let a
  h.className += ' wf-loading'
  tk.src = `https://use.typekit.net/${config.kitId}.js`
  tk.async = true
  const cb = () => {
    a = this.readyState
    if (f || (a && a !== 'complete' && a !== 'loaded')) return
    f = true
    clearTimeout(t)
    try {
      window.Typekit.load(config)
    } catch (e) {
      // do nothing
    }
  }
  tk.onload = cb
  tk.onreadystatechange = cb
  s.parentNode.insertBefore(tk, s)
}

if (typeof document !== 'undefined') {
  install(document)
}
