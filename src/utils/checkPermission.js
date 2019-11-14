import store from '@/store';

export default ( isSelf, permission ) => {
  const { state: { user } } = store;
  const ownPermission = `own${permission}`;
  const otherPermission = `other${permission}`;

  return isSelf ? !user.permissions[ownPermission] : !user.permissions[otherPermission];
};
