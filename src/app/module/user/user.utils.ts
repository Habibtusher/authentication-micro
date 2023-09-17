import User from "./user.model";


export const findLastUserId = async (): Promise<string | undefined> => {
    const lastUser = await User.findOne(
      { id: 1 }
    ).sort({
      createdAt: -1,
    });
  
    return lastUser?.id ? lastUser.id.substring(2) : undefined;
  };


export const generateUserId = async (): Promise<string> => {
    const currentId =
      (await findLastUserId()) || (0).toString().padStart(5, '0');
    
  
    
  
    return (parseInt(currentId) + 1).toString().padStart(5, '0');;
  };