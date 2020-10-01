export default (value) => {
    const array = value.split(' ')
    return array
        .map((item) => item.replace(item.charAt(0), item.charAt(0).toUpperCase()))
        .toString()
        .replace(/,/g, ' ')
}
