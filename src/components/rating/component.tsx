import {Avatar, Button, Card, CardBody, Textarea} from "@material-tailwind/react";
import React from "react";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import qs from "qs";
import {createRate, getUserById} from "../../redux/reducers/variable.ts";
import {RateDataProps} from "../../interface/redux/variable.interface.ts";

export default function RatingComponent() {

    const dispatch = useAppDispatch()
    const location = useLocation()

    const {user} = useAppSelector(state => state.variables)

    const [rating, setRating] = React.useState<number>(0);
    const [comment, setComment] = React.useState<string>('');

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    React.useEffect(() => {
        if (query.userId && !user) {
            dispatch(getUserById(query.userId.toString()))
        }
    }, [query])

    const handleRating = (index: number) => {
        setRating(index);
    };

    async function onClick() {
        if (user) {
            const data: RateDataProps = {
                comment: comment,
                rate: rating.toString(),
                userId: user.id.toString()
            }

            await dispatch(createRate(data));
            toast.success("Izoh bildirganingiz uchun tashakkur!");
            setComment('');
            setRating(0)
        }
    }

    if (!user)
        return ""

    return (
        <Card className="w-full max-w-sm" placeholder={undefined} onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
            <CardBody className="flex flex-col items-start space-y-4" placeholder={undefined}
                      onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex items-center space-x-4">
                    <Avatar src={user.img || "https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                    <div className="space-y-1">
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.position}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <StarIcon
                            key={index}
                            className={`w-6 h-6 text-yellow-600 ${index <= rating ? 'fill-yellow-400' : ''}`}
                            onClick={() => handleRating(index)}
                        />
                    ))}
                </div>
                <Textarea
                    label={'Kommentariya'}
                    className="w-full"
                    rows={3}
                    value={comment}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onChange={(e) => setComment(e.target.value)}
                    autoFocus
                />
                <div className={'flex justify-end w-full'}>
                    <Button
                        variant={'filled'}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        placeholder={undefined}
                        onClick={onClick}
                        disabled={rating === 0 || !comment.length}
                    >
                        Jo'natish
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

function StarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    )
}