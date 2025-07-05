import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const JobsBlogSection = () => {
  const [jobsArticles, setJobsArticles] = useState([]);

  useEffect(() => {
    const fetchJobsArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/articles?category=685950421cada6edbdbd070b'); // 👈 replace with your backend URL
        const data = Array.isArray(res.data) ? res.data : res.data.articles || [];
        setJobsArticles(data);
      } catch (err) {
        console.error("Error fetching jobs articles:", err);
      }
    };

    fetchJobsArticles();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Jobs Blog</h2>
          <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {jobsArticles.map((article) => (
              <CarouselItem key={article._id || article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to={`/article/${article._id || article.id}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex lg:flex-col">
                      <div className="w-32 h-24 lg:w-full lg:h-48 flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="flex-1 p-4 lg:p-6">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {article.category}
                        </Badge>
                        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default JobsBlogSection;
