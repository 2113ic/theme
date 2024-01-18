import { useNameSpace } from "./ns"

const ns = useNameSpace('btn')

console.log(ns.is('disabled'))
console.log(ns.child('loading'))

console.log(ns())
console.log(ns('loading'))
console.log(ns(['primary', 'success', 'warning', 'danger']))
console.log(ns({ primary: true, loading: false }))
