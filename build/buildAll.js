const glob = require('glob')
const { exec } = require('child_process')

let themeList = glob.sync('src/themes/*')
let styleList = glob.sync('src/assets/scss/*').filter(v => v.indexOf('.scss') === -1)
// console.log('themeList', themeList, 'styleList', styleList)

themeList.map(theme => {
    let themeName = theme.slice(11)
    styleList.map(style => {
        let styleName = style.slice(16)
        // console.log('ssss', themeName, styleName)
        exec(`npm run build --theme=${themeName}_${styleName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                return
            }
            console.log(`stdout: ${stdout}`)
            console.log(`stderr: ${stderr}`)
        })
    })
})