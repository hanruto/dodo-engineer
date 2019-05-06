const path = require('path')

module.exports = {
  templateDir: path.join(__dirname, '../../templates'),
  projectDir: path.join(__dirname, '../../../'),
  workDir: path.join(__dirname, '../../../../work'),
  workProjectMap: {
    'entry-mp': 'primary_entry_camp',
    'free-study-mp': 'primary-school_mp_study',
    'study-mp': 'Primary_School_MP',
    h5: 'mobileH5V2',
    shadow: 'Shadow'
  }
}
