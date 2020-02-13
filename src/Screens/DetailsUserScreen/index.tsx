import * as React from 'react'
import { useParams } from 'react-router-dom';
import { getDetailBorrower } from '../../Api/Service/borrower';
import { IResponseListUser } from '../../modal/response/listUser';
import { Spinner, Container, Col, Row } from 'reactstrap';
import './index.css'
import { formatCurrency, converDate } from '../../utils';
import { PageContentEmpty } from './Empty';

export const DetailsUserScreen: React.FC<{}> = () => {
    let { userid } = useParams();
    const [userInfo, setUserInfo] = React.useState<IResponseListUser>(null)

    React.useEffect(() => {
        getDetailBorrower(userid).then(res => {
            setUserInfo(res.data)
        })
    }, [userid])

    return <Container>
        <Row>
            <Col md={3}>
                {userInfo !== null
                    ? <div className="d-flex flex-column">
                        <div className="detail-user__container justify-content-lg-between">
                            <div className="text-center">
                                <img src={userInfo.avata} alt="avata" className="detail-user__avata" />
                            </div>
                            <div className="mt-2">
                                <div className="detail-title">{userInfo.name}</div>
                                <div >Số điện thoại:<span className="text-primary"> {userInfo.phone_number}</span></div>
                                <div >Địa chỉ: <span className="text-primary">{userInfo.address}, {userInfo.ward.name}, {userInfo.district.name}</span></div>
                                <div>Ngày mượn: <span className="text-danger">{converDate(userInfo.created_at)}</span></div>
                            </div>
                        </div>
                        <div className="detail-user__container mt-2">
                            <div className="detail-title">Tổng Số tiền</div>
                            <div className="detail-total">{formatCurrency(userInfo.total)}</div>
                        </div>
                    </div>
                    : <Spinner type="grow" color="primary" />}
            </Col>
            <Col md={9}>
                <div className="detail-user__container">
                    {userInfo && userInfo.history.length === 0 && <PageContentEmpty description="Lịch sử đóng tiền trống" />}
                </div>
            </Col>
        </Row>
    </Container>
}


