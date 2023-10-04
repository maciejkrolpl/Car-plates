export default function data() {
    const countries = ['czechia', 'poland', 'germany', 'ukraine'];
    return Promise.all(
        countries.reduce((all, current) => {
            all.push(import(`./${current}.js`))
            all.push(import(`./${current}.svg`))
            return all;
        }, [])
    )
}
