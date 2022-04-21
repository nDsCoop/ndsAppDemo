import React, { Component } from "react";
import { Typography, Container } from "@material-ui/core";
import className from 'classnames';
import _ from 'lodash'


const ref = React.createRef();
export default class PrivacyApp extends Component {
        constructor(props){
            super(props)
            this.state = {
                showBtnBackToTop: false,
                linkActive: null
            }

        }

        componentDidMount() {
            window.addEventListener('scroll', this.toggleVisibility);
            
        }
        componentDidUpdate(){
            console.log("link active: ", this.state.linkActive)
        }

      
        toggleVisibility = () => {
           if(window.pageYOffset > 440){
               this.setState({
                   showBtnBackToTop: true
               })
           }else{
            this.setState({
                showBtnBackToTop: false
            })
           }
        }
      
        scrollToTop() {
            console.log(this.state.showBtnBackToTop, window.pageYOffset, typeof(window.pageYOffset))
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            
        }

    render(){
        const {isEnglish} = this.props
        const listsContent = [
            {
                id:1,
                link: '#list1',
                name: 'Privacy Highlights',
                nameNotEng: 'Chính sách nổi bật'
            },
            {
                id:2,
                link: '#list2',
                name: 'nDsApp Collects',
                nameNotEng: 'Ứng dụng thu thập'
            },
            {
                id:3,
                link: '#list3',
                name: 'Purposes Using Info',
                nameNotEng: 'Mục tiêu Thu thập'
            },
            {
                id:4,
                link: '#list4',
                name: 'Sharing of Personal',
                nameNotEng: 'Chia sẻ thông tin cá nhân'
            },
            {
                id:5,
                link: '#list5',
                name: 'Cookie Policy',
                nameNotEng: 'Chính sác Cookie'
            },
            {
                id:6,
                link: '#list6',
                name: 'Data Security',
                nameNotEng: 'Bảo mật dữ liệu'
            },
            {
                id:7,
                link: '#list7',
                name: 'Retention of Info',
                nameNotEng: 'Lưu giữ thông tin'

            },
            {
                id:8,
                link: '#list8',
                name: 'Children’s Privacy',
                nameNotEng: 'Quyền trẻ em'
            },
            {
                id:9,
                link: '#list9',
                name: 'Third Party Sites',
                nameNotEng: 'Bên thứ ba'
            },
            {
                id:10,
                link: '#list10',
                name: 'Your Rights',
                nameNotEng: 'Quyền của bạn'
            },
            {
                id:11,
                link: '#list11',
                name: 'California Privacy',
                nameNotEng: 'Quyền khu vưc Mỹ'
            },
            {
                id:12,
                link: '#list12',
                name: 'Brazil Privacy',
                nameNotEng: 'Quyền khu vực Brazil'
            },
            {
                id:'12b',
                link: '#list12b',
                name: 'Updates Privacy',
                nameNotEng: 'Chính sách Cập nhật'
            },
            {
                id:14,
                link: '#list14',
                name: 'Contact nDsGroup',
                nameNotEng: 'Liên hệ nDsGroup'
            }

        ]
        return (

        <div className="privacy-app-main" ref={ref}>
            
            <div className="left-privacy-app">
                <ul className="links-content">
                    {
                        listsContent.map((list) => {
                            return <li key={list.id}>
                                <a onClick={() => this.setState({linkActive: list.id})} 
                                    href={list.link}  className={className('scroll-link', {'activelink-content' : _.get(list, 'id') === this.state.linkActive})}>
                                        {isEnglish ? list.name : list.nameNotEng}
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="right-privacy-app">
            {this.state.showBtnBackToTop && (
            <div className="btn-back-to-top">
                <div className="btn-inside" onClick={() => this.scrollToTop()}>
                   <span></span>
                </div>
            </div>)}
            <section id='list1' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Privacy Statement Highlights' : 'Chính sách nổi bật'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'When you use and interact with our websites or services, communicate with or otherwise contact us, we may collect, use, share and process information relating to you ("Personal Data"). These Privacy Statement Highlights summarize our Personal Data processing practices and your related rights.' 
                        : 'Khi bạn sử dụng và tương tác với các trang web hoặc dịch vụ của chúng tôi, liên lạc với hoặc liên hệ với chúng tôi, chúng tôi có thể thu thập, sử dụng, chia sẻ và xử lý thông tin liên quan đến bạn ("Dữ liệu Cá nhân"). Những điểm nổi bật của Tuyên bố về Quyền riêng tư này tóm tắt các phương pháp xử lý Dữ liệu Cá nhân của chúng tôi và các quyền liên quan của bạn.'}
                        
                        <br />
                        {isEnglish ? 'In this Privacy Policy, "personal information" includes references to "personal data" as defined under applicable laws. Your use of our Sites and Services, and any dispute over privacy, is subject to this Policy and the relevant Terms, including the applicable limitations on damages and the resolution of disputes. The Terms are incorporated by reference into this Policy.' 
                        : 'Trong Chính sách Bảo mật này, "thông tin cá nhân" bao gồm các tham chiếu đến "dữ liệu cá nhân" như được định nghĩa theo luật hiện hành. Việc bạn sử dụng các Trang web và Dịch vụ của chúng tôi cũng như bất kỳ tranh chấp nào về quyền riêng tư, đều phải tuân theo Chính sách này và các Điều khoản có liên quan, bao gồm các giới hạn hiện hành về thiệt hại và giải quyết tranh chấp. Các Điều khoản được kết hợp bằng cách tham chiếu vào Chính sách này.'}
                        
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list2' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Personal Information That nDsApp Collects' : 'nDsApp thu thập thông tin các nhân'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ?'We collect personal information when visit to App or you register for an account.'
                        :'Chúng tôi thu thập thông tin cá nhân khi bạn truy cập vào Ứng dụng hoặc bạn đăng ký tài khoản.'}
                        <br />
                        {isEnglish ? 'Personal information collected on the Sites includes community forum content, profiles, photographs, names, unique identifiers (e.g., social media handles or usernames), contact and billing information (e.g., email address, postal address, telephone, fax), and transaction information. Also, in order to tailor subsequent communications to users and continuously improve the Sites’ operations and services, nDsApp also ask users to provide additional optional information regarding their interests, demographics, experience and detailed contact preferences.'
                        : 'Thông tin cá nhân được thu thập trên Trang web bao gồm nội dung diễn đàn cộng đồng, hồ sơ, ảnh, tên, số nhận dạng duy nhất (ví dụ: xử lý phương tiện truyền thông xã hội hoặc tên người dùng), thông tin liên hệ và thanh toán (ví dụ: địa chỉ email, địa chỉ bưu điện, điện thoại, fax), và thông tin giao dịch. Ngoài ra, để điều chỉnh các giao tiếp tiếp theo cho người dùng và liên tục cải thiện hoạt động và dịch vụ của Sites, nDsApp cũng yêu cầu người dùng cung cấp thông tin tùy chọn bổ sung liên quan đến sở thích, nhân khẩu học, kinh nghiệm và sở thích liên hệ chi tiết của họ.'}
                        <br />

                        {isEnglish ? 'Communications. When you communicate with us (via email, phone, through the Sites or otherwise), we may maintain a record of your communication.' 
                        : 'Thông tin liên lạc. Khi bạn liên lạc với chúng tôi (qua email, điện thoại, qua Trang web hoặc cách khác), chúng tôi có thể duy trì hồ sơ liên lạc của bạn.'}
                        <br />
                        {isEnglish ? ' Automatically Collected Information. In addition, nDsApp may automatically collect the following information about users’ use of the Sites or Services through cookies, web beacons, and other technologies: your domain name; your browser type and operating system; web pages you view; links you click; your IP address; the length of time you visit our Sites and or use our Services; and the referring URL, or the webpage that led you to our Sites. We may combine this information with other information that we have collected about you, including, where applicable, your user name, name, and other personal information. Please see our Cookie Policy for more information about our use of cookies.'
                        : 'Thông tin được thu thập tự động. Ngoài ra, nDsApp có thể tự động thu thập thông tin sau về việc sử dụng Trang web hoặc Dịch vụ của người dùngthông qua cookie, đèn hiệu web và các công nghệ khác: tên miền của bạn; loại trình duyệt và hệ điều hành của bạn; các trang web bạn xem; liên kết bạn nhấp vào; địa chỉ IP của bạn;khoảng thời gian bạn truy cập Trang web của chúng tôi và hoặc sử dụng Dịch vụ của chúng tôi; và URL giới thiệu hoặc trang web đã dẫn bạn đến các Trang web của chúng tôi. Chúng tôi có thể kết hợp thông tin này vớithông tin khác mà chúng tôi đã thu thập về bạn, bao gồm, nếu có, tên người dùng, tên của bạn và thông tin cá nhân khác. Vui lòng xem Chính sách Cookie của chúng tôi để biết thêm thông tin về việc sử dụng cookie của chúng tôi.'}
                        <br />
                        {isEnglish ? 'De-identified Information. We may de-identify and aggregate certain personal information we collect such that the information no longer identifies or can be linked to a particular user or an individual data subject (“De-identified Information”), subject to the terms of any applicable user agreements. We may use this information to improve our Services, analyze trends, publish market research, and for other marketing, research or statistical purposes, and may disclose such information to third parties for these specific purposes.' 
                        : 'Thông tin được xác định danh tính. Chúng tôi có thể xóa danh tính và tổng hợp thông tin cá nhân nhất định mà chúng tôi thu thập để thông tin đó không còn nhận dạng hoặc có thể được liên kếtcho một người dùng cụ thể hoặc một chủ thể dữ liệu riêng lẻ (“Thông tin được xác định danh tính”), tuân theo các điều khoản của bất kỳ thỏa thuận người dùng hiện hành nào. Chúng tôi có thể sử dụng thông tin nàyđể cải thiện Dịch vụ của chúng tôi, phân tích xu hướng, xuất bản nghiên cứu thị trường và cho các mục đích tiếp thị, nghiên cứu hoặc thống kê khác và có thể tiết lộ thông tin đó cho các bên thứ ba cho các mục đích cụ thể này.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list3' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish? 'Purposes and Legal Bases for Our Using of Your Personal Information' : 'Mục đích và Cơ sở pháp lý để Chúng tôi Sử dụng Thông tin Cá nhân của Bạn'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'Purposes and Legitimate Interests nDsApp use the personal information we collect for our legitimate operate interests, which include the following purposes:' 
                        : 'Mục đích và lợi ích hợp pháp nDsApp sử dụng thông tin cá nhân mà chúng tôi thu thập cho các lợi ích hoạt động hợp pháp của chúng tôi, bao gồm các mục đích sau:'}
                        <br />
                        {isEnglish ? 'Providing our Sites and Services. To provide the Services and our Sites (including Project Sites), to communicate with you about your use of our Sites and Services, to respond to your inquiries, provide troubleshooting of the Sites and for other purposes to support users and the community.' 
                        : 'Cung cấp các Trang web và Dịch vụ của chúng tôi. Để cung cấp Dịch vụ và Trang web của chúng tôi (bao gồm Trang web dự án), để trao đổi với bạn về việc bạn sử dụng Trang web và Dịch vụ của chúng tôi, để trả lời các câu hỏi của bạn, cung cấp cách khắc phục sự cố của Trang web và cho các mục đích khác để hỗ trợ người dùng và cộng đồng.'}
                        <br />
                        {isEnglish ? "In addition, to ensure the safety of the system, the way it works properly, ensure the security of resources and information that we collect from people, and ensure the stability you interact with. application. We don't know for sure who you are so we need to collect every possible information from users accessing and authorized users, making sure they are all confidential only you and we know, and a The amount of information is encoded according to the pattern that we generate, we may not even be able to know without deep intervention, except in special cases where it is necessary to decode that information."
                        : 'Ngoài ra, để đảm bảo an toàn cho hệ thống, cách thức hoạt động của hệ thống, đảm bảo an toàn cho tài nguyên và thông tinmà chúng tôi thu thập từ mọi người và đảm bảo sự ổn định mà bạn tương tác. ứng dụng. Chúng tôi không biết chắc chắn bạn là aichúng tôi cần thu thập mọi thông tin có thể có từ người dùng truy cập và người dùng được ủy quyền, đảm bảo rằng tất cả chúng chỉ được bảo mậtbạn và chúng tôi biết, và một lượng thông tin được mã hóa theo mẫu mà chúng tôi tạo ra, chúng tôi thậm chí có thể không biết nếu không có sự can thiệp sâu,trừ những trường hợp đặc biệt cần thiết phải giải mã thông tin đó.'}
                        <br />
                        {isEnglish ? 'Prevent Misuse. Where we believe necessary to investigate, prevent or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person or violations of the relevant Terms or this Privacy Policy.' 
                        : 'Ngăn chặn việc sử dụng sai. Trường hợp chúng tôi tin rằng cần thiết để điều tra, ngăn chặn hoặc thực hiện hành động liên quan đến các hoạt động bất hợp pháp, nghi ngờ gian lận, các tình huống liên quan đến các mối đe dọa tiềm ẩn đối với sự an toàn của bất kỳ người nào hoặc vi phạm Điều khoản liên quan hoặc Chính sách quyền riêng tư này.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list4' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? ' Sharing of Personal Information' : 'Chia sẻ thông tin cá nhân'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? ' We may share personal information with third parties who provide services to nDsApp, such as payment processors, email delivery services, software providers and when we enter into product integrations with Software providers. Additionally, to improve user experience, we offer single sign-on solutions for account login and these third parties (including Facebook and Google) may receive information from these services when you elect to use them. When nDsApp shares your personal information and other collected information with third party service providers, we require that they use your information only for the purpose of providing services to us and consistent with this privacy policy.'
                        : 'Chúng tôi có thể chia sẻ thông tin cá nhân với các bên thứ ba cung cấp dịch vụ cho nDsApp, chẳng hạn như bộ xử lý thanh toán,dịch vụ gửi email, nhà cung cấp phần mềm và khi chúng tôi tham gia tích hợp sản phẩm với nhà cung cấp Phần mềm.Ngoài ra, để cải thiện trải nghiệm người dùng, chúng tôi cung cấp các giải pháp đăng nhập một lần để đăng nhập tài khoản và các bên thứ ba này (bao gồm Facebook và Google) có thểnhận thông tin từ các dịch vụ này khi bạn chọn sử dụng chúng. Khi nDsApp chia sẻ thông tin cá nhân của bạn và các thông tin đã thu thập khác với các nhà cung cấp dịch vụ bên thứ ba,chúng tôi yêu cầu họ chỉ sử dụng thông tin của bạn cho mục đích cung cấp dịch vụ cho chúng tôi và nhất quán với chính sách bảo mật này.'}
                        <br />
                        {isEnglish ? 'Legally Required. We may disclose your information if we are required to do so by law (including to law enforcement in the U.S. and other jurisdictions).Protection of Rights. We may disclose information where we believe it necessary to respond to claims asserted against us or, comply with legal process (e.g., subpoenas or warrants), enforce or administer our agreements and terms, for fraud prevention, risk assessment, investigation, and protect the rights, property or safety of nDsApp, its Users, participants in its events or Projects, or others.Anonymized and Aggregated Information. We may share aggregate or De-identified information with third parties for research, marketing, analytics and other purposes, provided such information does not identify a particular individual.' 
                        : 'Bắt buộc về mặt pháp lý. Chúng tôi có thể tiết lộ thông tin của bạn nếu luật pháp yêu cầu chúng tôi làm như vậy (bao gồm cả đối với cơ quan thực thi pháp luật ở Hoa Kỳ và các khu vực pháp lý khác).Bảo vệ Quyền. Chúng tôi có thể tiết lộ thông tin mà chúng tôi tin rằng cần thiết để phản hồi các tuyên bố chống lại chúng tôi hoặc tuân thủ quy trình pháp lý (ví dụ: trát đòi hầu tòa hoặc trát),thực thi hoặc quản lý các thỏa thuận và điều khoản của chúng tôi, để ngăn ngừa gian lận, đánh giá rủi ro, điều tra và bảo vệ các quyền, tài sản hoặcsự an toàn của nDsApp, Người dùng của nó, những người tham gia vào các sự kiện hoặc Dự án của nó, hoặc những người khác.Thông tin được ẩn danh và tổng hợp. Chúng tôi có thể chia sẻ thông tin tổng hợp hoặc thông tin chưa được xác định với các bên thứ ba để nghiên cứu, tiếp thị, phân tích vàcác mục đích khác, miễn là thông tin đó không xác định một cá nhân cụ thể.'}
                        <br />
                        {isEnglish ? 'We absolutely do not use your information for commercial purposes or have any related problems for the unauthorized use of your personal information without the consent of the user. However, with some core activities such as brand development, traffic usage evaluation of information storage system we may use a few small points in your information that we store (About They are basically all public when operating on the app) and make sure that the information is used with strict, closed communication between us and third parties, ensuring user privacy and placing give them the legal status if they use the information.'
                        : 'Chúng tôi tuyệt đối không sử dụng thông tin của bạn cho mục đích thương mại hoặc có bất kỳ vấn đề gì liên quan đến việc sử dụng trái phép thông tin cá nhân của bạn khi chưa được sự đồng ý của người dùng.Tuy nhiên, với một số hoạt động cốt lõi như phát triển thương hiệu, đánh giá lưu lượng sử dụng hệ thống lưu trữ thông tin, chúng tôi có thể sử dụng một vài điểm nhỏ trong thông tin của bạn mà chúng tôi lưu trữ(Về cơ bản Tất cả đều công khai khi hoạt động trên ứng dụng) và đảm bảo rằng thông tin được sử dụng với sự trao đổi chặt chẽ, kín giữa chúng tôi vàbên thứ ba, đảm bảo quyền riêng tư của người dùng và đặt cho họ tư cách pháp lý nếu họ sử dụng thông tin.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list5' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Cookie Policy' : 'Chính sách Cookie'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'A cookie is a small piece of text that allows a website to recognize your device and maintain a consistent, cohesive experience throughout multiple sessions. If you use the nDsApp Network, both nDsApp and third parties will use cookies to track and monitor some of your activities on and off the nDsApp Network, and store and access some data about you, your browsing history, and your using.' 
                        : 'Cookie là một đoạn văn bản nhỏ cho phép trang web nhận ra thiết bị của bạn và duy trì trải nghiệm nhất quán, gắn kết trong nhiều phiên.Nếu bạn sử dụng Mạng nDsApp, cả nDsApp và các bên thứ ba sẽ sử dụng cookie để theo dõi và giám sát một số hoạt động của bạn trên và ngoài Mạng nDsApp,và lưu trữ và truy cập một số dữ liệu về bạn, lịch sử duyệt web và việc sử dụng của bạn.'}
                        <br />
                        {isEnglish ? 'This policy describes how both nDsApp and other third parties use cookies both within and without the nDsApp network and how you can exercise a greater degree of control over cookies. Please keep in mind that this may alter your experience with our platform, and may limit certain features (including being logged in as a user).' 
                        : 'Chính sách này mô tả cách cả nDsApp và các bên thứ ba khác sử dụng cookie cả bên trong và không có mạng nDsApp và cách bạn có thể thực hiện mức độ kiểm soát cao hơn đối với cookie. Hãy nhớ rằng điều này có thể thay đổi trải nghiệm của bạn với nền tảng của chúng tôi và có thể hạn chế một số tính năng nhất định (bao gồm cả việc đăng nhập với tư cách người dùng).'}
                        <br />
                        {isEnglish ? ' General Browsing: We use cookies that are important for certain technical features of our website, like logging into user accounts and implementing fixes and improvements to our platform.'
                        : 'Duyệt web chung: Chúng tôi sử dụng các cookie quan trọng đối với các tính năng kỹ thuật nhất định của trang web của chúng tôi, như đăng nhập vào tài khoản người dùng và triển khai các bản sửa lỗi và cải tiến cho nền tảng của chúng tôi.'}
                        <br />
                        {isEnglish ? 'These cookies:' : 'Các cookie gồm:'}<br />
                            <li>{isEnglish ? 'Enable behavior in our Products and/or Services that is tailored to the activity or preferences of a person visiting our properties'
                            :'Cho phép hành vi trong Sản phẩm và / hoặc Dịch vụ của chúng tôi được điều chỉnh cho phù hợp với hoạt động hoặc sở thích của một người đến thăm các sản phẩm của chúng tôi'}</li>
                            <li>{isEnglish ? 'Allow users to opt out of certain types of modeling, tailoring, or personalization in our products'
                            :'Cho phép người dùng chọn không tham gia một số loại mô hình hóa, thiết kế riêng hoặc cá nhân hóa trong các sản phẩm của chúng tôi'}</li>
                            <li>{isEnglish ? 'Collect information on our users’ preferences in order to create more useful products'
                            :'Thu thập thông tin về sở thích của người dùng để tạo ra nhiều sản phẩm hữu ích hơn'}</li>
                            <li>{isEnglish ? 'Maintain the regular business operations of our Advertising and Marketing departments'
                            :'Duy trì hoạt động kinh doanh thường xuyên của các bộ phận Quảng cáo và Tiếp thị của chúng tôi (chẳng hạn như cửa sổ bật lên một lần hoặc hiển thị "anh hùng" khi lần đầu tiên truy cập vào một trang web và để thu thập số lần hiển thị và nhấp chuột)'}</li>
                            <li>{isEnglish ? 'Help to diagnose and correct downtime, bugs, and errors in our code to ensure that our products are operating efficiently':'Giúp chẩn đoán và sửa thời gian chết, lỗi và lỗi trong mã của chúng tôi để đảm bảo rằng các sản phẩm của chúng tôi đang hoạt động hiệu quả'}</li>
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list6' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Data Security' : 'Bảo mật dữ liệu'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'We have implemented commercially reasonable precautions designed to protect the information we collect from loss, misuse, and unauthorized access, disclosure, alteration, and destruction. Please be aware that despite our best efforts, no data security measures can guarantee 100% security.'
                        :'Chúng tôi đã thực hiện các biện pháp phòng ngừa hợp lý về mặt thương mại được thiết kế để bảo vệ thông tin chúng tôi thu thập khỏi bị mất mát, lạm dụng, và truy cập, tiết lộ, thay đổi và phá hủy trái phép. Xin lưu ý rằng mặc dù chúng tôi đã cố gắng hết sức, nhưng không có biện pháp bảo mật dữ liệu nào có thể đảm bảo an toàn 100%.'}
                        <br />
                        {isEnglish ? 'You should take steps to protect against unauthorized access to your passwords, phone, and computer by, among other things, signing off after using a shared computer, choosing robust passwords that nobody else knows or can easily guess, not using a password for more than one site or service, and keeping your log-ins and passwords private. We are not responsible for any lost, stolen, or compromised passwords or for any activity on your account via unauthorized password activity. We ask you to promptly notify us if you become aware that any information provided by or submitted to our Sites or through our S is lost, stolen, or used without permission at'
                        :'Bạn nên thực hiện các bước để bảo vệ khỏi truy cập trái phép vào mật khẩu, điện thoại và máy tính của mình bằng cách đăng xuất sau khi sử dụng máy tính dùng chung,chọn mật khẩu mạnh mà không ai khác biết hoặc có thể dễ dàng đoán được, không sử dụng mật khẩu cho nhiều trang web hoặc dịch vụ và giữ bí mật thông tin đăng nhập và mật khẩu của bạn.Chúng tôi không chịu trách nhiệm về bất kỳ mật khẩu nào bị mất, bị đánh cắp hoặc bị xâm phạm hoặc đối với bất kỳ hoạt động nào trên tài khoản của bạn thông qua hoạt động mật khẩu trái phép. Chúng tôi yêu cầu bạn nhanh chóng thông báo cho chúng tôinếu bạn biết rằng bất kỳ thông tin nào được cung cấp bởi hoặc được gửi đến các Trang web của chúng tôi hoặc thông qua S của chúng tôi đều bị mất, bị đánh cắp hoặc được sử dụng mà không được phép tại'}
                        <a style={{color: "hsl(185, 57%, 50%)"}} href="/about/feedback">{isEnglish ? ' Feedback-Support' : ' Hỗ trợ-Phản hồi'}</a>.
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list7' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Retention of Your Personal Information' : 'Lưu giữ thông tin cá nhân của bạn'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'We generally keep personal information only for as long as required to fulfill the purposes for which it was collected. However, in some circumstances, we may retain personal information for other periods of time, for instance where we are required to do so in accordance with legal, tax and accounting requirements, or if required to do so by a legal process, legal authority, or other governmental entity having authority to make the request, for so long as required. In specific circumstances, we may also retain your personal information for longer periods of time corresponding to a statute of limitation, so that we have an accurate record of your dealings with us in the event of any complaints or challenges.' 
                        :'Chúng tôi thường chỉ lưu giữ thông tin cá nhân chừng nào được yêu cầu để thực hiện các mục đích mà thông tin đó được thu thập. Tuy nhiên, trong một số trường hợp, chúng tôi có thể lưu giữ thông tin cá nhân trong những khoảng thời gian khác, chẳng hạn như khi chúng tôi buộc phải làm như vậy theo các yêu cầu pháp lý, thuế và kế toán, hoặc nếu được yêu cầu làm như vậy bởi một quy trình pháp lý, cơ quan pháp lý hoặc tổ chức chính phủ khác có thẩm quyền đưa ra yêu cầu, trong thời gian dài nếu được yêu cầu. Trong những trường hợp cụ thể, chúng tôi cũng có thể lưu giữ thông tin cá nhân của bạn trong thời gian dài hơn tương ứng với quy chế giới hạn, để chúng tôi có hồ sơ chính xác về các giao dịch của bạn với chúng tôi trong trường hợp có bất kỳ khiếu nại hoặc thách thức nào.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list8' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Children’s Privacy' : 'Quyền riêng tư của trẻ em'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? ' Except as specifically indicated within a Site, we do not knowingly collect or solicit personal information from anyone under the age of sixteen (16), or knowingly allow such persons to register. If we become aware that we have collected personal information from a child under the relevant age without parental consent, we take steps to delete that information. Where we specifically indicate that we collect personal information from children under 16, we will obtain the parent or guardian’s consent and provide adequate notice.' 
                        : 'Trừ khi được chỉ định cụ thể trong một Trang web, chúng tôi không cố ý thu thập hoặc cố tình thu thập thông tin cá nhân từ bất kỳ ai dưới mười sáu (16) tuổi, hoặc cố ý cho phép những người đó đăng ký.Nếu chúng tôi biết rằng chúng tôi đã thu thập thông tin cá nhân từ một đứa trẻ dưới độ tuổi có liên quan mà không có sự đồng ý của cha mẹ, chúng tôi sẽ thực hiện các bước để xóa thông tin đó. Trường hợp chúng tôi chỉ rõ rằng chúng tôi thu thập thông tin cá nhân từ trẻ em dưới 16 tuổi,chúng tôi sẽ nhận được sự đồng ý của cha mẹ hoặc người giám hộ và cung cấp thông báo đầy đủ.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list9' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Links to Third Party Sites and Services' : 'Liên kết đến các trang web và dịch vụ của bên thứ ba'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'The Sites may contain links to third party sites or online services. Please refer to the privacy policies of the relevant third party websites or services to find out more about how they process and handle personal information.'
                        : 'Các Trang web có thể chứa các liên kết đến các trang web của bên thứ ba hoặc các dịch vụ trực tuyến. Vui lòng tham khảo chính sách bảo mật của các trang web hoặc dịch vụ của bên thứ ba có liên quan để tìm hiểu thêm về cách họ xử lý và xử lý thông tin cá nhân.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list10' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'You Rights' : 'Quyền của bạn'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'Access and Amendment. You may contact our privacy coordinator, as set forth below, to access or amend your personal information.'
                        : 'Truy cập và Sửa đổi. Bạn có thể liên hệ với điều phối viên về quyền riêng tư của chúng tôi, như được nêu dưới đây, để truy cập hoặc sửa đổi thông tin cá nhân của bạn.'}
                        <br />
                        {isEnglish ? 'Submitting a Request. To exercise the above rights or contact us with questions or complaints regarding our treatment of your personal information, contact us at'
                        : 'Gửi yêu cầu. Để thực hiện các quyền trên hoặc liên hệ với chúng tôi nếu có thắc mắc hoặc khiếu nại về chúng tôi xử lý thông tin cá nhân của bạn, liên hệ với chúng tôi tại'}
                        <a style={{color: "hsl(185, 57%, 50%)"}} href="/about/feedback">{isEnglish ? 'Feedback-Support' : 'Hỗ trợ-Phản hồi'}</a>.
                        {isEnglish ? 'Please note that we may request proof of identity, and we reserve the right to charge a fee where permitted by law, especially if your request is manifestly unfounded or excessive. We will respond to your request within the applicable timeframes set out by law.'
                        : 'Xin lưu ý rằng chúng tôi có thể yêu cầu bằng chứng nhận dạng, và chúng tôi có quyền tính phí nếu pháp luật cho phép, đặc biệt nếu yêu cầu của bạn rõ ràng là không có cơ sở hoặc quá mức. Chúng tôi sẽ trả lời yêu cầu của bạn trong khung thời gian hiện hành do luật định.'}
                        <br />
                       {isEnglish ? ' Only applies to basic information that you provide publicly when registering with us. For the information in the account verification request, after we have authenticated to exchange them, you need to have other documents with equal value to the information you previously submitted to be able to request changes.' 
                       : 'Chỉ áp dụng cho những thông tin cơ bản mà bạn cung cấp công khai khi đăng ký với chúng tôi. Đối với thông tin trong yêu cầu xác minh tài khoản, sau khi chúng tôi xác thực để trao đổi, bạn cần có những giấy tờ khác có giá trị tương đương với thông tin bạn đã gửi trước đó để có thể yêu cầu thay đổi.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list11' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        California Privacy{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        Under the CCPA, you have the right to access the Personal Information we’ve collected about you during the past 12 months and information about our data practices. 
                        You also have the right to request that we delete the Personal Information that we have collected from you.
                        To request manual access or deletion of your Personal Information, please contact us here.
                        <br />
                        Under the CCPA, you have the right to access the Personal Information we’ve collected about you during the past 12 months and information about our data practices. You also have the right to request that we delete the Personal Information that we have collected from you.
                        To request manual access or deletion of your Personal Information, please contact us <a style={{color: "hsl(185, 57%, 50%)"}} href="/about/feedback">Feedback-Support</a>.
                        Please note, for all manual requests, you will need to verify your identity by providing us with the following information:
                        <br />
                        <li>Your full name</li>
                        <li>Your email address</li>
                        <li>Your nDsApp phone number</li>
                        <li>Whether you are a California consumer pursuant to Cal. Civ. Code Sec. 1798.140(g)</li>
                        <br />
                        nDsApp will not be able to respond to your request unless you provide us with all of the above information. You can also designate an authorized agent to make a manual request on your behalf. If you decide to use an authorized agent, 
                        please also include written permission that you have designated that agent to make this request, or proof of the agent’s power of attorney. We may also follow-up with you to verify your identity before processing your authorized agent’s request.
                        <br />
                        Lastly, you have the right to be free from any discrimination for exercising your rights to access or delete your Personal Information. We will not discriminate against you for exercising any of these rights.
                        <br />
                        If you have additional questions about this Notice or how to exercise your rights under the CCPA, please contact us.
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list12' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        This Brazil Privacy Notice{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        This Brazil Privacy Notice (“Notice”) applies to 
                        personal data processing activities under Brazilian law and supplements our Privacy Policy.
                        <br />
                        Under the Brazilian General Data Protection Law (the “LGPD”), you have the right to access, rectify, port, erase, and confirm that we process your data. 
                        Learn more about your rights and find out how you can exercise your rights by visiting our iPhone, Android and KaiOS articles in our Help Center. 
                        In certain circumstances, you also have the right to object to and to restrict the processing of your personal data. Our Privacy Policy provides information about how we share data with third parties.
                        <br />
                        The data controller responsible for your information is nDsApp. To contact the Data Protection Officer for nDsApp.
                        You also have the right to petition the Brazilian Data Protection Authority (“DPA”) by contacting the DPA directly.
                        <br />
                        If you have additional questions about this Notice or how to exercise your rights under the CCPA, please contact us.
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list12b' className="section-content">
                <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        {isEnglish ? 'Updates Privacy & Policy' : 'Chính sách & Quyền riêng tư'}{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        {isEnglish ? 'We may amend or update our Privacy Policy. We will provide you notice of amendments to this Privacy Policy, as appropriate, and update the “Last Modified” date at the top of this Privacy Policy. Your continued use of our Services confirms your acceptance of our Privacy Policy, as amended. If you do not agree to our Privacy Policy, as amended, you must stop using our Services. Please review our Privacy Policy from time to time.' 
                        : 'Chúng tôi có thể sửa đổi hoặc cập nhật Chính sách Bảo mật của chúng tôi. Chúng tôi sẽ cung cấp cho bạn thông báo về các sửa đổi đối với Chính sách Bảo mật này, nếu thích hợp, và cập nhật ngày “Sửa đổi lần cuối” ở đầu Chính sách Bảo mật này. Việc bạn tiếp tục sử dụng Dịch vụ của chúng tôi xác nhận rằng bạn chấp nhận Chính sách Bảo mật của chúng tôi, đã được sửa đổi. Nếu bạn không đồng ý với Chính sách Bảo mật của chúng tôi, như đã được sửa đổi, bạn phải ngừng sử dụng Dịch vụ của chúng tôi. Vui lòng xem lại Chính sách Bảo mật của chúng tôi theo thời gian.'}
                        </Typography>
                    </section>
                </Container>
            </section>
            <section id='list14' className="section-content">
            <Container>
                    <header>
                        <Typography variant="h4" gutterBottom={true}>
                        Contact with us{" "}
                        </Typography>
                    </header>
                    <div className="deliver"></div>
                    <br />
                    <section>
                        <Typography gutterBottom={true} variant="subtitel1" style={{color: 'rgb(218, 226, 236)', marginLeft: '1rem'}}>
                        If you have questions about our Privacy Policy, please contact us via <a href="/about/feedback">Feedback-Support</a>.
                        <br />

                            nDsApp DSG<br />
                            Privacy Policy<br />
                            LeVanQuoi / Number14 / 74 Road<br />
                            BHHA, Tan Binh<br />
                            Ho Chi Minh City, Viet Nam<br />

                        </Typography>
                    </section>
                </Container>
            </section>
                
            </div>
           
          </div>
        );
      }
   
}
