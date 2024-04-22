interface Profile {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
  isActive: true;
  isAdmin: true;
  isStaff: true;
  isSuperuser: true;
  groups: string[];
  userPermissions: string[];
}

export default Profile;
