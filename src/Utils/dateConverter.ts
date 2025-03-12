export const dateConvertor = (str: string | Date) => {
    let isDate = new Date(str)

    let date = String(isDate.getDate()).padStart(2, "0")
    let month = String(isDate.getMonth() + 1).padStart(2, "0")
    let year = isDate.getFullYear()
    console.log(`${date}/${month}/${year}`)
    return `${date}-${month}-${year}`
}