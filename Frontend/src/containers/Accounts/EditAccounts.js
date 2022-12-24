import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  TextField,
  Select,
  FormControl,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  MenuItem,
  InputAdornment,
  Chip,
  Autocomplete,
  InputLabel
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import PublishIcon from '@mui/icons-material/Publish'
import Cancel from '@mui/icons-material/Cancel'
// import { useTheme } from '@mui/material/styles'

import '../Leads/lead_css.css'
import { accountUrl } from '../../components/ApiUrls'
import { UseForm } from '../../components/UseForm'
import { fetchData } from '../../components/FetchData'
import { Appbar } from '../../components/Appbar'

const textFieldStyled = makeStyles(() => ({
  root: {
    borderLeft: '2px solid red',
    height: '40px'
  },
  fieldHeight: {
    height: '40px'
  }
}))

// function getStyles (name, personName, theme) {
//   return {
//     fontWeight:
//       theme.typography.fontWeightRegular
//   }
// }

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 310
    }
  }
}

export const EditAccounts = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [error, setError] = useState(false)
  const [errors, setErrors] = useState('')
  const [msg, setMsg] = useState('')
  // const [account, setAccount] = useState([])
  const [setLogo] = useState([])
  // const [status, setStatus] = useState([state.accounts.status])
  const [responceError, setResponceError] = useState(false)
  const [setImgData] = useState([])
  const [setLogot] = useState(null)
  const textFieldClasses = textFieldStyled()
  // const [personName, setPersonName] = useState([])
  const [accountData, setAccountData] = useState([])
  // const theme = useTheme()

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  useEffect(() => {
    fetchData(`${accountUrl}/`, 'GET', null, headers)
      .then((data) => {
        if (!data.error) {
          setAccountData(...accountData, {
            industries: data.industries,
            tags: data.tags
          })
        }
        // if (data.error) {
        // }
      })
      .catch(() => {
      })
  }, [])

  // const handleChange = (target, key) => {
  //   if (target.name === 'account') {
  //     const newKey = []
  //     newKey.push((key.key).replace(/[^0-9]/g, '', '$'))
  //     val.account = JSON.stringify(newKey)
  //     setAccount(target.value)
  //     val.account = target.value
  //   } else if (target.name === 'user_details') {
  //     val.user_details = target.value
  //   }
  // }

  const tagsHandle = (event, value) => {
    val.tags = JSON.stringify(value)
  }

  const changeHandler = (event) => {
    if (event.target.files[0]) {
      setLogo(event.target.files[0])
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgData(reader.result)
        setLogot(true)
      })
      val.account_attachment = event.target.files[0]
    }
  }

  const validatation = () => {
    let flag = true
    if (!(Object.prototype.hasOwnProperty.call(val, 'name')) || val.name === '') {
      flag = false
      setError('*required  field')
      setMsg('name')
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'phone')) || val.phone === '') {
      setError('*required field')
      setMsg('phone')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'email')) || val.email === '') {
      setError('*required field')
      setMsg('email')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'billing_address_line')) || val.billing_address === '') {
      setError('*required field')
      setMsg('billing_address_line')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'billing_street')) || val.billing_address === '') {
      setError('*required field')
      setMsg('billing_street')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'billing_postcode')) || val.billing_address === '') {
      setError('*required field')
      setMsg('billing_postcode')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'billing_city')) || val.billing_address === '') {
      setError('*required field')
      setMsg('billing_city')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'billing_state')) || val.billing_address === '') {
      setError('*required field')
      setMsg('billing_state')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'billing_country')) || val.billing_address === '') {
      setError('*required field')
      setMsg('billing_country')
      flag = false
    } else {
      setError('')
      setMsg('')
    }
    return flag
  }

  const submitCallBack = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      org: localStorage.getItem('org')
    }

    if (validatation()) {
      fetchData(`${accountUrl}/${state.account_id}/`, 'PUT', JSON.stringify(val), headers)
        .then((data) => {
          if (!data.error) {
            setResponceError(data.error)
            navigate('/accounts')
          }
          if (data.error) {
            setResponceError(data.error)
            setErrors(data.errors)
          }
        })
        .catch(() => {
        })
    }
  }

  const backbtnHandle = () => {
    navigate('/accounts')
  }

  const [val, onChange, onSubmit] = UseForm(submitCallBack)
  const module = 'Accounts'
  const crntPage = 'Edit Accounts'
  const backBtn = 'Back To Accounts'

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Appbar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} />
        {/* contact details */}
        <div style={{ padding: '10px' }}>
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography style={{
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    color: '#1A3353'
                  }}
                  >
                    Account Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '98%' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div
                    className='fieldContainer'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Name</div>
                      <TextField
                        error={!!(msg === 'name' || errors.name)}
                        name='name'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        defaultValue={state.accounts && state.accounts.name ? state.accounts.name : ''}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'name' || msg === 'required')}
                        helperText={
                          (error && msg === 'name') || msg === 'required' || responceError
                            ? errors ? errors.name ? errors.name : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Website</div>
                      <TextField
                        error={!!(msg === 'website' || errors.website)}
                        name='website'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        defaultValue={state.accounts && state.accounts.website ? state.accounts.website : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'website') || msg === 'required' || responceError
                            ? errors ? errors.website ? errors.website : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div
                    className='fieldContainer'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Phone Number</div>
                      <TextField
                        error={!!(msg === 'phone' || errors.phone)}
                        defaultValue={state.accounts && state.accounts.phone ? state.accounts.phone : ''}
                        name='phone'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'phone' || msg === 'required')}
                        helperText={
                          (error && msg === 'phone') || msg === 'required' || responceError
                            ? errors ? errors.phone ? errors.phone : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Email Address</div>
                      <TextField
                        error={!!(msg === 'email' || errors.email)}
                        defaultValue={state.accounts && state.accounts.email ? state.accounts.email : ''}
                        name='email'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'email' || msg === 'required')}
                        helperText={
                          (error && msg === 'email') || msg === 'required' || responceError
                            ? errors ? errors.email ? errors.email : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer' style={{ color: '#1A3353', fontWeight: 'normal' }}>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Skype ID</div>
                      <TextField
                        error={!!(msg === 'skype_ID' || errors.skype_ID)}
                        name='skype_ID'
                        defaultValue={state.accounts && state.accounts.skype_ID ? state.accounts.skype_ID : ''}
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'skype_ID') || msg === 'required' || responceError
                            ? errors ? errors.skype_ID ? errors.skype_ID : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Leads</div>
                      <TextField
                        name='lead'
                        select
                        onChange={onChange}
                        // value={state.accounts && state.accounts.lead ? state.accounts.lead.map((v) => v.title ): ""}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        helperText={
                          (error && msg === 'lead') || msg === 'required' || responceError
                            ? errors ? errors.lead ? errors.lead : '' : error
                            : ''
                        }
                        style={{ width: '70%' }}
                      >
                        {/* {state.lead_source && state.lead_source.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>
                        ))} */}
                      </TextField>
                    </div>
                  </div>
                  <div className='fieldContainer' style={{ color: '#1A3353', fontWeight: 'normal' }}>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Organization</div>
                      <TextField
                        error={!!(msg === 'organization' || errors.organization)}
                        name='organization'
                        defaultValue={state.accounts && state.accounts.organization ? state.accounts.organization : ''}
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'organization') || msg === 'required' || responceError
                            ? errors ? errors.organization ? errors.organization : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Teams</div>
                      <TextField
                        error={!!(msg === 'teams' || errors.teams)}
                        name='teams'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        value={state.accounts.teams ? state.accounts.teams.name : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'teams') || msg === 'required' || responceError
                            ? errors ? errors.teams ? errors.teams : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2' style={{ color: '#1A3353', fontWeight: 'normal' }}>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Contact Name</div>
                      <FormControl
                        sx={{ width: '70%' }}
                        error={!!(msg === 'contacts' || errors.contacts)}
                        helperText={
                          (error && msg === 'contacts') || msg === 'required' || responceError
                            ? errors ? errors.contacts ? errors.contacts : '' : error
                            : ''
                        }
                      >
                        <InputLabel id='demo-multiple-name-label' />
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          name='contacts'
                          defaultValue={state.accounts && state.accounts.contact_name ? state.accounts.contact_name : ''}
                          size='small'
                          onChange={onChange}
                          MenuProps={MenuProps}
                        >
                          {/* {state.accounts_list  && state.accounts_list.map((name) => (
                            <MenuItem
                              key={ name }
                              value={ name }
                            >
                              { name.id }
                            </MenuItem>
                          ))} */}
                        </Select>
                      </FormControl>
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Assigned To</div>
                      <FormControl sx={{ width: '70%' }}>
                        <InputLabel id='demo-multiple-name-label' />
                        <Select
                          labelId='demo-multiple-name-label'
                          defaultValue={state.accounts && state.accounts.assigned_to ? state.accounts.assigned_to : ''}
                          id='demo-multiple-name'
                          name='assigned_to'
                          size='small'
                          onChange={onChange}
                          MenuProps={MenuProps}
                          helperText={
                            (error && msg === 'assigned_to') || msg === 'required' || responceError
                              ? errors ? errors.assigned_to ? errors.assigned_to : '' : error
                              : ''
                          }
                        >
                          {/* {state.accounts_list  && state.accounts_list.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                            >
                              {name.id}
                            </MenuItem>
                          ))} */}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className='fieldContainer2' style={{ color: '#1A3353', fontWeight: 'normal' }}>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Status</div>
                      <FormControl sx={{ width: '70%' }}>
                        <InputLabel id='demo-multiple-name-label' />
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          name='status'
                          size='small'
                          onChange={onChange}
                          MenuProps={MenuProps}
                          helperText={
                            (error && msg === 'status') || msg === 'required' || responceError
                              ? errors ? errors.status ? errors.status : '' : error
                              : ''
                          }
                        >
                          {/* {state.accounts_list  && state.accounts_list.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                            >
                              {name.id}
                            </MenuItem>
                          ))} */}
                        </Select>
                      </FormControl>
                    </div>
                    <div className='fieldSubContainer' style={{ paddingTop: '4px' }}>
                      <div className='fieldTitle'>Tags</div>
                      <Autocomplete
                        multiple
                        id='tags-filled'
                        name='tags'
                        sx={{ maxHeight: 100, overFlow: 'hidden' }}
                        defaultValue={state.accounts && state.accounts.tags ? state.accounts.tags.map((v) => v.name) : ''}
                        options={accountData.tags && accountData.tags ? accountData.tags.map((option) => option.name) : ['']}
                        onChange={(event, value) => tagsHandle(event, value)}
                        style={{ width: '70%', display: 'flex', flexDirection: 'column' }}
                        size='small'
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <div style={{ overFlow: 'scroll' }}>
                              <Chip
                                deleteIcon={<Cancel color='primary' />}
                                style={{
                                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                                }}
                                variant='outlined'
                                label={option}
                                {...getTagProps({ index })
                                }
                              />
                            </div>
                          ))}
                        renderInput={(params) => (
                          <TextField
                            style={{ display: 'flex', flexDirection: 'column' }}
                            sx={{ maxHeight: 60, display: 'flex', flexDirection: 'column', overflow: 'auto' }}
                            {...params}
                            placeholder='add Tags'
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '5%', color: '#1A3353', width: '100%', fontWeight: 'normal' }}>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Industry</div>
                      <FormControl sx={{ width: '70%' }}>
                        <InputLabel id='demo-multiple-name-label' />
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          name='industry'
                          size='small'
                          defaultValue={state.accounts && state.accounts.industry}
                          onChange={onChange}
                          MenuProps={MenuProps}
                        >
                          {
                            accountData.industries && accountData.industries.length && accountData.industries.map((option) => (
                              <MenuItem key={option[1]} value={option[0]}>
                                {option[1]}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Attachment</div>
                      <TextField
                        name='account_attachment'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <label htmlFor='icon-button-file'>
                                <input
                                  hidden
                                  accept='image/*'
                                  id='icon-button-file'
                                  type='file'
                                  name='lead_attachment'
                                  onChange={changeHandler}
                                />
                                <PublishIcon color='primary' />
                              </label>
                            </InputAdornment>
                          ),
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        id='outlined-error-helper-text'
                        onChange={onChange} style={{ width: '70%' }}
                        size='small'
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Contact Details */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '20px'
          }}
          >
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div style={{ borderBottom: '1px solid lightgray', width: '100%' }}>
                  <Typography style={{
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    color: '#1A3353'
                  }}
                  >
                    Contact Details
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '100%' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', color: '#1A3353', fontWeight: 'normal' }}>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                      <div style={{
                        marginRight: '10px',
                        fontSize: '13px',
                        width: '22%',
                        textAlign: 'right',
                        fontWeight: 'bold'
                      }}
                      >
                        Billing Address
                      </div>
                      <TextField
                        error={msg === 'billing_address_line'}
                        name='billing_address_line'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        defaultValue={state.accounts && state.accounts.billing_address_line ? state.accounts.billing_address_line : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'billing_address_line' || msg === 'required')}
                        helperText={
                          msg === 'billing_address_line' || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                      <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Street</div>
                      <TextField
                        id='outlined-error-helper-text'
                        error={!!(msg === 'billing_street' || msg === 'required')}
                        name='billing_street'
                        onChange={onChange}
                        style={{ width: '70%' }}
                        defaultValue={state.accounts && state.accounts.billing_street ? state.accounts.billing_street : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        required={!!(msg === 'billing_street' || msg === 'required')}
                        helperText={
                          (error && msg === 'billing_street') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px', color: '#1A3353', fontWeight: 'normal' }}>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                      <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Postal Code</div>
                      <TextField
                        id='outlined-error-helper-text'
                        error={!!(msg === 'billing_postcode' || msg === 'required')}
                        name='billing_postcode'
                        defaultValue={state.accounts && state.accounts.billing_postcode ? state.accounts.billing_postcode : ''}
                        required={!!(msg === 'billing_postcode' || msg === 'required')}
                        onChange={onChange} style={{ width: '70%' }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        helperText={
                          (error && msg === 'billing_postcode') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'row', color: '#1A3353', fontWeight: 'normal' }}>
                      <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>City</div>
                      <TextField
                        error={msg === 'billing_city'}
                        name='billing_city'
                        id='outlined-error-helper-text'
                        defaultValue={state.accounts && state.accounts.billing_city ? state.accounts.billing_city : ''}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'billing_city' || msg === 'required')}
                        helperText={
                          msg === 'billing_city' || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px', color: '#1A3353', fontWeight: 'normal' }}>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                      <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>State</div>
                      <TextField
                        name='billing_state'
                        error={!!(msg === 'billing_state' || msg === 'required')}
                        id='outlined-error-helper-text'
                        defaultValue={state.accounts && state.accounts.billing_state ? state.accounts.billing_state : ''}
                        onChange={onChange} style={{ width: '70%' }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        required={!!(msg === 'billing_state' || msg === 'required')}
                        size='small'
                        helperText={
                          (error && msg === 'billing_state') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                      <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Country</div>
                      <TextField
                        error={msg === 'billing_country'}
                        name='billing_country'
                        onChange={onChange}
                        id='outlined-error-helper-text'
                        defaultValue={state.accounts && state.accounts.billing_country ? state.accounts.billing_country : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'billing_country' || msg === 'required')}
                        helperText={
                          msg === 'billing_country' || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Description details  */}
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography style={{
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    color: '#1A3353'
                  }}
                  >
                    Description
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '100%' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div
                    className='DescriptionDetail'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='descriptionSubContainer'>
                      <div className='descriptionTitle'>Description</div>
                      <TextareaAutosize
                        aria-label='minimum height'
                        name='description'
                        defaultValue={state.accounts && state.accounts.description ? state.accounts.description : ''}
                        minRows={8}
                        onChange={onChange} style={{ width: '80%', padding: '5px' }}
                        placeholder='Add Description'
                      />
                    </div>
                    <div />
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </form>
    </div>
  )
}
