function parseColor(c) {
  let cache
  const p = parseInt,
    color = c.replace(/\s/g,'')

  if ((cache = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color))) {
    cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)]
  } else if ((cache = /#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color))) {
    cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17]
  } else if ((cache = /rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color))) {
    cache = [+cache[1], +cache[2], +cache[3], +cache[4]]
  } else if ((cache = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))) {
    cache = [+cache[1], +cache[2], +cache[3]]
  } else {
    cache = [0, 0, 0, 1]
  }

  if (isNaN(cache[3])) {
    cache[3] = 1
  }

  return cache.slice(0, 4)
}

export function px(val) {
  return (typeof val === 'number') ? `${val}px` : val
}

export function semiOpaqueColor(color, opacity) {
  const rgba = parseColor(color)
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] * opacity})`
}
