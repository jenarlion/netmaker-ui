import { Grid } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NmForm } from '../../../components/form/Form';
import { NmFormInputSwitch } from '../../../components/form/FormSwitchInput';
import { NmFormInputText } from '../../../components/form/FormTextInput';
import { updateNetwork } from '../../../store/modules/network/actions';
import { Network } from '../../../store/modules/network/types';
import { networkToNetworkPayload } from '../../../store/modules/network/utils';
import { authSelectors } from '../../../store/selectors';

export const NetworkDetailsEdit: React.FC<{
  network: Network;
}> = ({ network }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const token = useSelector(authSelectors.getToken);

  const onSubmit = useCallback(
    (data: Network) => {
      dispatch(
        updateNetwork.request({
          token: token!,
          network: networkToNetworkPayload(data),
        })
      );
    },
    [dispatch, token]
  );

  if (!network) {
    return <div>Not Found</div>;
  }

  return (
      <NmForm initialState={network} onSubmit={onSubmit}
      submitProps={{
        variant: "outlined",
      }}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
        <Grid item xs={12}>
          <div>
            <NmFormInputSwitch
              name={"allowmanualsignup"}
              label={"Allow Node Signup Without Keys"}
            />
          </div>
        </Grid>
        <NmFormInputText
          name={"addressrange"}
          label={t("network.addressrange")}
        />
        <NmFormInputText
          name={"addressrange6"}
          label={t("network.addressrange6")}
        />
        <NmFormInputText name={"localrange"} label={t("network.localrange")} />
        <NmFormInputText
          name={"displayname"}
          label={t("network.displayname")}
        />
        <NmFormInputText
          name={"defaultinterface"}
          label={t("network.defaultinterface")}
        />
        <NmFormInputText
          name={"defaultlistenport"}
          label={t("network.defaultlistenport")}
        />
        <NmFormInputText
          name={"defaultpostup"}
          label={t("network.defaultpostup")}
        />
        <NmFormInputText
          name={"defaultpostdown"}
          label={t("network.defaultpostdown")}
        />
        <NmFormInputText
          name={"defaultkeepalive"}
          label={t("network.defaultkeepalive")}
        />
        <NmFormInputText
          name={"checkininterval"}
          label={t("network.checkininterval")}
        />
        <NmFormInputText
          name={"defaultextclientdns"}
          label={t("network.defaultextclientdns")}
        />
        <NmFormInputText name={"defaultmtu"} label={t("network.defaultmtu")} />
        <NmFormInputSwitch
          name={"isdualstack"}
          label={t("network.isdualstack")}
        />
        <NmFormInputSwitch
          name={"defaultsaveconfig"}
          label={t("network.defaultsaveconfig")}
        />
        <NmFormInputSwitch
          name={"defaultudpholepunch"}
          label={t("network.defaultudpholepunch")}
        />
      </NmForm>
  );
};