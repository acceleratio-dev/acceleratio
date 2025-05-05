import { createEvent, createStore } from "effector";


export const $serviceDetails = createStore({
    open: false,
    service_id: ""
})

export const openServiceDetails = createEvent<string>()
export const closeServiceDetails = createEvent()

$serviceDetails.on(openServiceDetails, (state, service_id) => ({
    ...state,
    open: true,
    service_id
}))

$serviceDetails.on(closeServiceDetails, (state) => ({
    ...state,
    open: false,
    service_id: ""
}))