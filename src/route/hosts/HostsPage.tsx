import { Container, Grid, Typography } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLinkBreadcrumb } from '~components/PathBreadcrumbs'
import { HostDetailPage } from './HostDetailPage'
import { HostsTable } from './components/HostsTable'
import { Host } from '~store/modules/hosts/types'

const mockHosts: Host[] = [
  {
    id: 'hostid0',
    name: 'host-zero',
    version: 'v0.18.0',
    os: 'linux',
    isdefault: true,
    localaddress: '10.0.236.23',
    nodes: [],
  } as unknown as Host,
  {
    id: 'hostid1',
    name: 'host-one',
    version: 'v0.18.0',
    os: 'darwin',
    isdefault: false,
    localaddress: '10.0.236.25',
    nodes: [],
  } as unknown as Host,
]

export const HostsPage: React.FC = () => {
  const { path } = useRouteMatch()
  const { t } = useTranslation()

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  } as any

  const loadHosts = useCallback(() => {
    // TODO: dispatch and source from store
  }, [])

  const filteredHosts = useMemo(() => {
    // TODO: search
    return mockHosts
  }, [])

  return (
    <Container maxWidth="xl">
      <Switch>
        {/* all hosts page */}
        <Route exact path={path}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <div style={titleStyle}>
                <Typography variant="h5">{t('hosts.hosts')}</Typography>
              </div>
            </Grid>
          </Grid>
          <HostsTable hosts={filteredHosts} />
        </Route>

        {/* host details page */}
        <Route path={`${path}/:hostId`}>
          <HostDetailPage />
        </Route>
      </Switch>
    </Container>
  )
}
