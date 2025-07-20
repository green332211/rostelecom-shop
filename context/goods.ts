'use client'
import { createDomain, Effect, sample } from 'effector'
import { createGate, Gate } from 'effector-react'
import { getBestsellerProductFx, getNewProductsFx } from '@/api/main-page'
import { IProduct } from '@/types/common'
import { loadOneProductFx } from '@/api/goods'
import { ILoadWatchedProductsFx } from '@/types/goods'

const goods = createDomain()

export const MainPageGate = createGate()

export const setCurrentProduct = goods.createEvent<IProduct>()
export const loadOneProduct = goods.createEvent<ILoadWatchedProductsFx>()

const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message)
    })

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    clock: gate.open,
    target: effect,
  })

export const $newProducts = goodsStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodsStoreInstance(getBestsellerProductFx)

goodsSampleInstance(getNewProductsFx, MainPageGate)
goodsSampleInstance(getBestsellerProductFx, MainPageGate)

export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productId)

sample({
  clock: loadOneProduct,
  target: loadOneProductFx,
})
