import { Container } from 'unstated'

class ListContainer extends Container {
    state = {
        todo: [],
        filter: 'All',
        stat: [0, 0, 0],
    }

    storeData = () => {
        localStorage.setItem('toDoList', JSON.stringify(this.state))
    }

    addItem = (text) => {
        this.setState(
            (state) => {
                if (text.length === 0) {
                    alert('item is empty')
                    return
                }

                const duplicate = state.todo.find((obj) => obj.text === text)

                if (duplicate) {
                    alert('similar item already existed')
                    return
                }
                state.todo.push({ text, done: false })
                state.stat[0] = state.stat[0] + 1
                state.stat[1] = state.stat[1] + 1

                return state
            },
            () => {
                this.storeData()
            }
        )
    }

    toggleDone = (text) => {
        this.setState(
            (state) => {
                const obj = state.todo.find((obj) => obj.text === text)
                obj.done = !obj.done

                if (obj.done) {
                    state.stat[1] = state.stat[1] - 1
                    state.stat[2] = state.stat[2] + 1
                } else {
                    state.stat[1] = state.stat[1] + 1
                    state.stat[2] = state.stat[2] - 1
                }

                return state
            },
            () => {
                this.storeData()
            }
        )
    }

    updateText = (text, newText, selfIndex) => {
        this.setState(
            (state) => {
                if (newText.length === 0) {
                    alert('item is empty')
                    return
                }
                const duplicate = state.todo.reduce((acc, { text }, index) => {
                    console.log('text', text)
                    console.log('acc', acc)
                    if (text === newText) {
                        acc.push(index)
                    }
                    return acc
                }, [])
                if (
                    duplicate.length > 1 ||
                    (duplicate.length === 1 && duplicate[0] !== selfIndex)
                ) {
                    alert('similar item already existed')
                    return
                }

                const obj = state.todo.find((obj) => obj.text === text)
                obj.text = newText
                return state
            },
            () => {
                this.storeData()
            }
        )
    }

    updateFilter = (filter) => {
        this.setState({ filter })
    }

    filteredList = () => {
        return this.state.todo.filter(
            (item) => {
                if (this.state.filter === 'All') {
                    return true
                } else if (this.state.filter === 'Active' && !item.done) {
                    return true
                } else if (this.state.filter === 'Done' && item.done) {
                    return true
                } else {
                    return false
                }
            },
            () => {
                this.storeData()
            }
        )
    }

    deleteItem = (text) => {
        this.setState(
            (state) => {
                state.todo.some((obj, index) => {
                    if (obj.text === text) {
                        state.todo.splice(index, 1)
                        return true
                    }
                    return false
                })
                return state
            },
            () => {
                this.storeData()
            }
        )
    }

    clearDone = () => {
        this.setState(
            (state) => {
                state.todo.forEach((element, index) => {
                    if (element.done) {
                        state.todo.splice(index, 1)
                    }
                })
                state.stat = [state.todo.length, state.todo.length, 0]
                return state
            },
            () => {
                this.storeData()
            }
        )
    }

    restoreData = () => {
        const cache = localStorage.getItem('toDoList')

        if (cache) {
            this.setState(JSON.parse(cache))
        }
    }
}

let listContainer = new ListContainer()

export { ListContainer, listContainer }
