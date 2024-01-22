import React from 'react'
import { AdminLayout } from '../../component/layout/AdminLayout'
import { DashboardSales } from '../../component/dashboard-charts/DashboardSales'
import { CustomCard } from '../../component/custom-card/CustomCard'
import { DashboardVisitor } from '../../component/dashboard-charts/DashboardVisitor'
import { Col, Row } from 'react-bootstrap'
import { DashboardGoals } from '../../component/dashboard-charts/DashboardGoals'
import { DashboardTable } from '../../component/dashboard-charts/DashboardTable'
import { DashboardTopSell } from '../../component/dashboard-charts/DashboardTopSell'

const Dashboard = () => {

  const charts = [
    {
      title: "Sales",
      linkTo: "/order",
      linkText: "All Sales",
      average: "$267,500",
      description: "Average Yearly Sales",
      additionalContent: <DashboardSales />
    },
    {
      title: "Visitor",
      linkTo: "/customer",
      linkText: "All Visitor",
      average: "1.245",
      description: "Web Visitor",
      additionalContent: <DashboardVisitor />
    },
    {
      title: "Sales Goals",
      linkTo: "/customer",
      linkText: "All Visitor",
      average: "$32,000",
      description: "Sales Goals",
      additionalContent: <DashboardGoals />
    },

  ]

  const dataList = [
    {
      title: "Stock Report",
      linkTo: "/order",
      linkText: "See All",
      average: "",
      description: "",
      additionalContent: <DashboardTable />
    },
    {
      title: "Top Selling Product",
      linkTo: "/order",
      linkText: "See All",
      average: "",
      description: "",
      additionalContent: <DashboardTopSell />
    },
  ]

  return <AdminLayout title="Dashboard">
    <p>You can see all the sales analysis results more clearly and completely</p>
    <Row className='mx-5 mb-2'>
      {
        charts.map((item, i) => (
          <Col key={i}>
            <CustomCard {...item} />
          </Col>
        ))
      }
    </Row>
    <Row className='mx-5 mb-5'>
      {
        dataList.map((item, i) => (
          <Col key={i} md={i === 0 ? 6 : 6} lg={i === 0 ? 8 : 4}>
            <CustomCard {...item} />
          </Col>
        ))
      }
    </Row>
  </AdminLayout>
}

export default Dashboard