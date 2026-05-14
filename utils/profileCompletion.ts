export const calculateProfileCompletion = (userData: any) => {
    if (!userData) {
        return {
            percentage: 0,
            completedFields: 0,
            totalFields: 0,
            circumference: 0,
            strokeDashoffset: 0,
        };
    }

    const profileFields = [
        userData?.firstName,
        userData?.lastName,
        userData?.email,
        userData?.pan_number,
        userData?.dateOfBirth,
        userData?.account_number,
        userData?.ifsc_code,
        userData?.nominee?.firstName,
        userData?.nominee?.lastName,
        userData?.nominee?.relation,
        userData?.nominee?.phone,
    ];

    const completedFields = profileFields.filter(
        (field) =>
            field !== undefined &&
            field !== null &&
            String(field).trim() !== ""
    ).length;

    const totalFields = profileFields.length;

    const percentage = Math.round(
        (completedFields / totalFields) * 100
    );

    return {
        percentage,
        completedFields,
        totalFields,
    };
};

export const getCircleProgress = (
    percentage: number,
    radius: number
) => {
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset =
        circumference -
        (percentage / 100) * circumference;

    return {
        circumference,
        strokeDashoffset,
    };
};