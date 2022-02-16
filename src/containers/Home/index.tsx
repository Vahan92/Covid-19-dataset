import React, { ChangeEvent, useEffect, useState, SyntheticEvent } from 'react';

import { MenuItem, Select, Switch, TextField, Typography } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Autocomplete, Box, Stack, Tab } from '@mui/material';

import covidData from '../../data.json';
import { getChartData, upperCase } from '../../utils/chartData';
import BarCharts from '../BarCharts';
import LineCharts from '../LineCharts';
import { MainWrapper, Container, Controls, NightMode } from './styled';

function HomePage() {
  const fullData = Object.values(covidData);

  const unfilteredWorldData = fullData.filter((country) => country.location === 'World')[0]?.data;

  const defaultWordData = unfilteredWorldData.map((value: any) => {
    return {
      date: value.date,
      cases: value.new_cases,
    };
  });

  const defaultBarData = fullData.map((info) => {
    return {
      country: info.location,
      'total deaths': info.data.at(-1).total_deaths,
      'total cases': info.data.at(-1).total_cases,
    };
  });

  const countries = fullData.map((info) => info.location);

  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tabValue, setTabValue] = useState('Reported cases');
  const [type, setType] = useState('cases');
  const [mode, setMode] = useState('');
  const [barMode, setBarMode] = useState('total cases');
  const [dataForChart, setDataForChart] = useState(defaultWordData);
  const [unfilteredData, setUnfilteredData] = useState(unfilteredWorldData);
  const [countryNum, setCountryNum] = useState(10);

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    setDataForChart(
      getChartData(
        unfilteredData?.length ? unfilteredData : unfilteredWorldData,
        `${mode}${type}`
      )
    );
  }, [type, mode]);

  const handleTabChange = (newValue: string) => {
    setTabValue(newValue);
  };

  const filterCountries = (text: string) => {
    const countryName = upperCase(text);
    const result = text.trim()
      ? fullData.filter((country) => upperCase(country.location) === countryName)[0]?.data
      : [];
    setDataForChart(
      getChartData(result?.length ? result : unfilteredWorldData, `${mode}${type}`)
    );
    setUnfilteredData(result);
    setSearchValue(countryName);
  };

  const barData = defaultBarData
    .filter((value) => value[barMode] !== undefined)
    .sort((a, b) => a[barMode] - b[barMode])
    .slice(-countryNum);

  return (
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <NightMode>
          <Typography>Light Mode</Typography>
          <Switch onChange={(e, value) => setDarkMode(value)} />
          <Typography>Dark Mode</Typography>
        </NightMode>
        <Container>
          <Autocomplete
            freeSolo
            onBlur={(event: any) =>
              !event.target.value.trim() &&
              filterCountries(event.target.value.trim())
            }
            id="country-select"
            disableClearable
            options={countries}
            onSelect={(e: ChangeEvent<HTMLInputElement>) =>
              filterCountries(e.target.value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="World"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                variant="fullWidth"
                onChange={(e: SyntheticEvent<Element, Event>, value: string) =>
                  handleTabChange(value)
                }
              >
                <Tab label="Reported cases" value="Reported cases" />
                <Tab label="Ranked charts" value="Ranked charts" />
              </TabList>
            </Box>

            <TabPanel value="Reported cases">
              <LineCharts type={`${mode}${type}`} dataForChart={dataForChart} />
              <Controls>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Cases</Typography>
                  <Switch
                    onChange={(e, value) => setType(value ? 'deaths' : 'cases')}
                  />
                  <Typography>Deaths</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Daily New Values</Typography>
                  <Switch
                    onChange={(e, value) => setMode(value ? 'total ' : '')}
                  />
                  <Typography>Cumulative Mode</Typography>
                </Stack>
              </Controls>
            </TabPanel>

            <TabPanel value="Ranked charts">
              <BarCharts
                type={barMode}
                dataForChart={barData}
                searchValue={searchValue}
              />
              <Controls>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Select
                    value={countryNum}
                    label="Number Of Countries"
                    onChange={(e: any) => setCountryNum(e.target.value)}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                  </Select>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Cases</Typography>
                  <Switch
                    onChange={(e, value) =>
                      setBarMode(value ? 'total deaths' : 'total cases')
                    }
                  />
                  <Typography>Deaths</Typography>
                </Stack>
              </Controls>
            </TabPanel>
          </TabContext>
        </Container>
      </MainWrapper>
    </ThemeProvider>
  );
}

export default HomePage;
